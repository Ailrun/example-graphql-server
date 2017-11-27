const makeGraphqlLogger = (chalk) => {
  const preLogger = ({ ip, method, path, protocol }) => {
    console.log(chalk.bold(
      chalk`${method} {green ${path}} via {green ${protocol}}
. requested from {green ${ip}}`
    ))
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
    console.log(chalk.bold(
      chalk`. with {yellow GraphQL parameters} = {yellow ${gqlParamsString}}`
    ))
  }

  const graphqlLogger = {
    preLogger,
    postLogger,
  }

  return graphqlLogger
}

module.exports = makeGraphqlLogger
