const makeDatabase = (fs, nedb, path, process, promisify) => {
  const dbName = '.example.db'
  const dbPath = path.join(process.cwd(), dbName)
  const dbExists = fs.existsSync(dbPath)

  if (!dbExists) {
    fs.copySync(path.join(__dirname, '..', dbName), dbPath)
  }

  const rawDB = new nedb({
    filename: '.example.db',
    autoload: true,
    timestampData: true,
  })

  return {
    find() {
      return promisify((...args) => {
        rawDB.find(...args)
      }, arguments)
        .then((results) => results[0])
    },
    findOne() {
      console.log('hi')
      console.log(arguments)
      console.log(promisify.toString())

      return promisify((...args) => {
        rawDB.findOne(...args)
      }, arguments)
        .then((results) => results[0])
    },
    insert() {
      return promisify((...args) => {
        rawDB.insert(...args)
      }, arguments)
        .then((results) => results[0])
    },
    count() {
      return promisify((...args) => {
        rawDB.count(...args)
      }, arguments)
        .then((results) => results[0])
    },
    update() {
      return promisify((...args) => {
        rawDB.update(...args)
      }, arguments)
    },
    remove() {
      return promisify((...args) => {
        rawDB.remove(...args)
      }, arguments)
        .then((results) => results[0])
    },
  }
}

module.exports = makeDatabase
