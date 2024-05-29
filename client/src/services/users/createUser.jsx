export default async function (username, password) {
  const response = await fetch("/api/users", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  const result = await response.json()

  return { response: response, result: result }
}