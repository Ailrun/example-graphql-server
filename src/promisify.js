const makePromisify = () => (func, args) => {
  args = Array.from(args)

  return new Promise((resolve, reject) => {
    args.push((err, ...result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
    func(...args)
  })
}

module.exports = makePromisify
