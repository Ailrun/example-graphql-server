const makeGraphqlLogger = (chalk) => {
  const preLogger = ({ ip, method, path, protocol }) => {
    console.log(
      chalk.bold(
        chalk.white(method) + ' ' + chalk.green(path) +
        ' via ' + chalk.green(protocol) + '\n' +
        '. requested from ' + chalk.green(`${ip}`)
      ) + chalk.reset('')
    )
  }

  const postLogger = (gqlParams) => {
    let gqlParamsString =
      JSON.stringify(gqlParams, undefined, 2)
        .replace(/\n\r?/g, '$&    ')
    if (gqlParams.query.length > 1000) {
      gqlParamsString = gqlParamsString
        .replace(
          /("query": )".*",(\n\r?)/,
          `$1"...complex query...(${gqlParams.query.length} characters)",$2`
        )
    }
    console.log(
      chalk.bold(
        '. with ' + chalk.yellow('GraphQL parameters') +
        ' = ' + chalk.yellow(gqlParamsString)
      ) + chalk.reset('')
    )
  }

  const graphqlLogger = {
    preLogger,
    postLogger,
  }

  return graphqlLogger
}

module.exports = makeGraphqlLogger
