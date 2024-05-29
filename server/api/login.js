import Users from "../models/Users.js"
import { checkIfKeysExist, isAuthenticated } from "../utils.js"


export default function (server, path) {
  path += "/login"

  server.get(path, isAuthenticated, async (req, res) => {
    try {

      return res.status(200).json(req.session.user)
    } catch (error) {

      return res.status(500).json({ message: "Något blev fel på servern." })
    }
  })

  server.post(path, async (req, res) => {
    try {

      if (!checkIfKeysExist(["username", "password"], req.body)) {
        return res.status(400).json({ message: "Saknar värden i request body." })
      }

      const user = await Users.find({
        username: req.body.username,
        password: req.body.password
      }).collation({ locale: 'sv', strength: 3 });

      if (user.length == 0) {
        return res.status(404).json({ message: "Hittade ingen användare." })
      } else {
        req.session.user = {
          id: user[0]._id,
          username: user[0].username
        }
        return res.status(201).json({ message: `${req.session.user.username} har loggat in.`, user: req.session.user })
      }

    } catch (error) {

      return res.status(500).json({ message: "Något blev fel på servern" })
    }
  })

  server.delete(path, isAuthenticated, async (req, res) => {
    try {

      req.session.destroy()
      return res.status(200).json({ message: "Du har loggat ut" })
    } catch (error) {

      return res.status(500).json({ message: "Något blev fel på servern" })
    }
  })
}
