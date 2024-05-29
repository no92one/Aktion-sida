export default async function () {
  const response = await fetch("/api/products")
  const result = await response.json()

  return { response: response, result: result }
} 