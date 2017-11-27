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
    console.log(chalk.bold(
      chalk` via {green ${protocol}}
. subscribed from {green ${remoteAddress}}
. with {yellow GraphQL parameters} = {yellow ${gqlParamsString}}`
    ))

    return gqlParams
  }

  const onConnect = (params, ws) => {
    const { protocol, upgradeReq } = ws
    const { url, socket } = upgradeReq
    const { remoteAddress } = socket
    console.log(chalk.bold(
      chalk` via {green ${protocol}}
. connected from {green ${remoteAddress}}`
    ))
  }

  const onDisconnect = (ws) => {
    const { protocol, upgradeReq } = ws
    const { url, socket } = upgradeReq
    const { remoteAddress } = socket
    console.log(chalk.bold(
      chalk` via {green ${protocol}}
. disconnected from {green ${remoteAddress}}`
    ))
  }

  const subscriptionLogger = {
    onOperation,
    onDisconnect,
  }

  return subscriptionLogger
}

module.exports = makeSubscriptionLogger
