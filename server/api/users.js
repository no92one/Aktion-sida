import Users from "../models/Users.js"
import { checkIfKeysExist, isAuthenticated } from "../utils.js"

export default function (server, path) {
  path += "/users"

  server.get(path + "/:id", isAuthenticated, async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)

      if (user) {
        return res.status(200).json(user)
      } else {
        return res.status(404).json({ message: "Hitta ingen användare." })
      }
    } catch (error) {

      res.status(500).json({ message: "Något blev fel på servern" })
    }
  })

  server.get(path + "/:username/exist", async (req, res) => {
    try {
      const result = await Users.find({ lowercaseUsername: req.params.username.toLowerCase() })

      if (result.length === 0) {
        return res.status(200).json(true)
      } else {
        return res.status(409).json(false)
      }
    } catch (error) {

      res.status(500).json({ message: "Något blev fel på servern" })
    }
  })

  server.post(path, async (req, res) => {
    try {
      if (!checkIfKeysExist(["username", "password"], req.body)) {
        return res.status(400).json({ message: "Saknar värden i request body." })
      }

      const exist = await Users.find({ lowercaseUsername: req.body.username.toLowerCase() })
      if (exist.length > 0) {
        return res.status(409).json({ message: "Det användarnamnet är redan upptaget." })
      }

      const newUser = new Users({
        username: req.body.username,
        lowercaseUsername: req.body.username.toLowerCase(),
        password: req.body.password
      })

      const savedUser = await newUser.save()
      if (!savedUser) {
        return res.status(500).json({ message: `Något gick fel när användaren - ${req.body.username} - skulle sparas till databasen.` })
      } else {
        return res.status(201).json({ message: `Användaren - ${savedUser.username} - har skapats.` })
      }
    } catch (error) {

      return res.status(500).json({ message: "Något blev fel på servern" })
    }
  })

}
