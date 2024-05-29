// console.log(checkKeysExist(
//   ["username", "password"],
//   {
//     username: "Kalle",
//     passwords: "abc123"
//   }
// ))

// function checkKeysExist(keys, object) {
//   return keys.every(key => object.hasOwnProperty(key))
// }

const arr = ["a", "b", "c"]

console.log(arr.some((value) => {
  console.log(value)
  value === "b"
}))
