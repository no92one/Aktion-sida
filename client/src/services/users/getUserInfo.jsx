export default async function (id) {
  const response = await fetch(`/api/users/${id}`)
  const result = await response.json()

  return { response: response, result: result }
} 