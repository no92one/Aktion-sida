export default async function (id, amount) {
  const response = await fetch(`/api/products/bid`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      amount: amount
    })
  })
  const result = await response.json()

  return { response: response, result: result }
} 