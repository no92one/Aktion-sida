import Products from "../models/Products.js"
import Users from "../models/Users.js"
import { checkIfKeysExist, isAuthenticated } from "../utils.js"

export default function (server, path) {
  path += "/products"

  server.get(path, async (req, res) => {
    try {
      const products = await Products.find()

      if (products.length === 0) {
        return res.status(404).json({ message: "Finns inga produkter i databasen." })
      }

      return res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ message: "Något blev fel på servern" })
    }
  })

  server.get(path + "/:id", async (req, res) => {
    try {
      const product = await Products.findById(req.params.id).populate([
        {
          path: "owner",
          select: "username"
        },
        {
          path: "bidHistory.user",
          select: "username -_id"
        }])

      if (!product) {
        return res.status(404).json({ message: "Hitta ingen produkt med det id't." })
      }

      return res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ message: "Något blev fel på servern" })
    }
  })

  server.post(path, isAuthenticated, async (req, res) => {
    try {
      if (!checkIfKeysExist(["name", "endTime"], req.body)) {
        return res.status(400).json({ message: "Saknar värden i request body." })
      }

      const user = await Users.findById(req.session.user.id)
      if (!user) {
        return res.status(409).json({ message: "Hittade ingen användare" })
      }

      const endTime = new Date(req.body.endTime)
      if (isNaN(endTime)) {
        return res.status(400).send('Fel format på datumet.');
      }

      const newProduct = new Products({
        owner: req.session.user.id,
        name: req.body.name,
        endTime: endTime,
        startingBid: req.body.hasOwnProperty("startingBid") ? req.body.startingBid : 1,
        description: req.body.hasOwnProperty("description") ? req.body.description : "",
        images: req.body.hasOwnProperty("images") ? req.body.images : []
      })

      if (newProduct.startingBid < 1) {
        return res.status(400).json({ message: "Startbudet måste vara minst 1." })
      }

      const savedProduct = await newProduct.save()
      if (!savedProduct) {
        return res.status(500).json({ message: `Något gick fel när produkten - ${req.body.name} - skulle sparas till databasen.` })
      }

      user.products.push(newProduct._id)
      const updateUser = await user.save()
      if (!updateUser) {
        return res.status(500).json({ message: "Något gick fel när produkten försöktes läggas till hos användaren." })
      }

      return res.status(201).json({ message: `Produkten - ${savedProduct.name} - har skapats.` })
    } catch (error) {

      res.status(500).json({ message: "Något blev fel på servern", errorMessage: error })
    }
  })

  server.put(path + "/bid", isAuthenticated, async (req, res) => {
    try {
      if (!checkIfKeysExist(["id", "amount"], req.body)) {
        return res.status(400).json({ message: "Saknar värden i request body." })
      }

      const product = await Products.findById(req.body.id)
      if (!product) {
        return res.status(404).json({ message: "Hittar inte produkten." })
      } if (product.owner.toString() === req.session.user.id) {
        return res.status(409).json({ message: "Kan inte buda på din egna produkt." })
      } else if (product.startingBid > req.body.amount ||
        product.activeBid.amount >= req.body.amount) {
        return res.status(409).json({ message: "Ditt bud måste vara större än det aktiva budet." })
      }

      if (product.activeBid.user !== undefined) {
        product.bidHistory.push(product.activeBid)
      }
      product.activeBid = {
        user: req.session.user.id,
        amount: req.body.amount,
        time: new Date()
      }

      const savedProduct = await product.save()
      if (!savedProduct) {
        return res.status(500).json({ message: "Något gick fel när produkten försöktes läggas till hos användaren." })
      }

      await savedProduct.populate({
        path: "bidHistory.user",
        select: "username -_id"
      })

      return res.status(201).json({ message: "Produkten har updaterats.", product: savedProduct })
    } catch (error) {

      res.status(500).json({ message: "Något blev fel på servern" })
    }
  })

  server.put(path + "/watch", isAuthenticated, async (req, res) => {
    try {
      if (!checkIfKeysExist(["id"], req.body)) {
        return res.status(400).json({ message: "Saknar värden i request body." })
      }

      const product = await Products.findById(req.body.id)
      if (!product) {
        return res.status(404).json({ message: "Hittar inte produkten." })
      } if (product.owner.toString() === req.session.user.id) {
        return res.status(409).json({ message: "Kan inte följa din egna produkt." })
      }

      const user = await Users.findById(req.session.user.id)
      let isWatching = false;
      if (!user) {
        return res.status(404).json({ message: "Hitta inte användaren." })
      } else if (user.watching.includes(product._id)) {
        const index = user.watching.indexOf(product._id)
        user.watching.splice(index, 1)
      } else {
        user.watching.push(product._id)
        isWatching = true
      }

      const savedUser = await user.save();
      if (!savedUser) {
        return res.status(500).json({ message: "Något gick fel när användaren skulle sparas till databasen." })
      }

      return res.status(201).json({ message: "Har uppdaterat användaren", watching: isWatching })
    } catch (error) {

      res.status(500).json({ message: "Något blev fel på servern" })
    }
  })

  server.put(path + "/:id", isAuthenticated, async (req, res) => {
    try {
      const user = await Users.findById(req.session.user.id)
      if (!user) {
        return res.status(404).json({ message: "Hittade ingen användare" })
      }

      if (!user.products.includes(req.params.id)) {
        return res.status(401).json({ message: "Du har inte behörighet att ändra produkten." })
      }

      const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // returnerar det uppdaterade objektet istället för det ursprungliga
        runValidators: true // säkerställer att uppdateringar valideras med Mongoose schemavalideringar
      })
      if (!product) {
        return res.status(404).json({ message: "Hitta inte produkten" })
      }

      return res.status(200).json({ message: "Produkten har updaterats.", product: product })
    } catch (error) {

      res.status(500).json({ message: "Något blev fel på servern" })
    }
  })

}
