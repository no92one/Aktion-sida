import Stripe from "stripe";

const stripe = new Stripe("sk_test_51P8MM9P1dj7PccMKsdbCz4ueV6nf2wQ8sBAlY0Yw1znT3hbV4cnahM6WWE6V8PVMMTyplOZiYfeCsbAMeg8UmaxV0084uMdbll")

export default function payment(server, path) {
  path += "/payment"

  server.post(path + '/create-checkout-session', async (req, res) => {
    try {
      let line_item = {
        price_data: {
          currency: 'sek',
          product_data: {
            name: "Test product",
          },
          unit_amount: 5 * 100,
        },
        quantity: 2,
      }


      const session = await stripe.checkout.sessions.create({
        line_items: [line_item],
        mode: 'payment',
        success_url: `http://localhost:5173/`,
        cancel_url: `http://localhost:5173/`,
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      res.status(500).json({ message: "Något blev fel på servern", errorMessage: error })
    }
  });

}
