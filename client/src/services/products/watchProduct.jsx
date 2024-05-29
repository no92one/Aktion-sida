export default async function (id) {
  const response = await fetch("/api/products/watch", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id
    })
  })
  const result = await response.json()

  return { response: response, result: result }
} 