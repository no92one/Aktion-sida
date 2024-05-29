export default async function (id) {
  const response = await fetch(`/api/products/${id}`)
  const result = await response.json()

  return { response: response, result: result }
} 