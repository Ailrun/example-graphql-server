const makeSubscriptionLogger = (chalk) => {
  const onOperation = (msg, gqlParams, ws) => {
    const { protocol, upgradeReq } = ws
    const { url, socket } = upgradeReq
    const { remoteAddress } = socket
    let gqlParamsString = JSON.stringify(gqlParams, undefined, 2)
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
        chalk.white(' via ') + chalk.green(protocol) + '\n' +
        '. subscribed from ' + chalk.green(remoteAddress) + '\n' +
        '. with ' + chalk.yellow('GraphQL parameters') +
        ' = ' + chalk.yellow(gqlParamsString)
      ) + chalk.reset('') 
    )

    return gqlParams
  }

  const onConnect = (params, ws) => {
    const { protocol, upgradeReq } = ws
    const { url, socket } = upgradeReq
    const { remoteAddress } = socket
    console.log(
      chalk.bold(
        chalk.white(' via ') + chalk.green(protocol) + '\n' +
        '. connected from ' + chalk.green(remoteAddress) + '\n'
      ) + chalk.reset('')
    )
  }

  const onDisconnect = (ws) => {
    const { protocol, upgradeReq } = ws
    const { url, socket } = upgradeReq
    const { remoteAddress } = socket
    console.log(
      chalk.bold(
        chalk.white(' via ') + chalk.green(protocol) + '\n' +
        '. disconnected from ' + chalk.green(remoteAddress) + '\n'
      ) + chalk.reset('')
    )
  }

  const subscriptionLogger = {
    onOperation,
    onDisconnect,
  }

  return subscriptionLogger
}

module.exports = makeSubscriptionLogger
