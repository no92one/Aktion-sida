import login from "./api/login.js";
import payment from "./api/payment.js";
import products from "./api/products.js";
import users from "./api/users.js";

export default function (server) {
  const path = "/api"

  login(server, path)
  payment(server, path)
  products(server, path)
  users(server, path)
}
