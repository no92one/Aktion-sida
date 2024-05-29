export default async function (username) {
  const response = await fetch(`/api/users/${username}/exist`)

  return await response.json()
} 