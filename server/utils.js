export function checkIfKeysExist(keys, object) {
  return keys.every(key => object.hasOwnProperty(key))
}

export function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Ingen inloggad." });
  }
}