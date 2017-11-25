const http = require('http')
const path = require('path')
const process = require('process')
const EventEmitter = require('events')

const express = require('express')
const fs = require('fs-extra')
const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')
const graphqlPlayground =
      require('graphql-playground-middleware-express').default
const { PubSub } = require('graphql-subscriptions')
const nedb = require('nedb')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const makeDatabase = require('./database')
const makeExpressServer = require('./expressServer')
const makeGraphqlMiddleware = require('./graphqlMiddleware')
const makeGraphqlSchema = require('./graphqlSchema')
const makeHttpServer = require('./httpServer')
const makePlaygroundMiddleware =
  require('./playgroundMiddleware')
const makePromisify = require('./promisify')
const makeRoutes = require('./routes')
const makeSubscriptionServer = require('./subscriptionServer')

const promisify = makePromisify()
const database = makeDatabase(fs, nedb, path, process, promisify)
const graphqlSchema = makeGraphqlSchema(graphql, EventEmitter, PubSub)
const graphqlMiddleware =
  makeGraphqlMiddleware(graphqlHTTP, graphqlSchema, database)
const routes = makeRoutes()
const playgroundMiddleware =
  makePlaygroundMiddleware(graphqlPlayground, routes)
const expressServer =
  makeExpressServer(
    express, graphqlMiddleware, playgroundMiddleware, routes
  )
const httpServer =
  makeHttpServer(expressServer, http)
const subscriptionServer =
  makeSubscriptionServer(
    graphql,
    httpServer, routes, graphqlSchema,
    SubscriptionServer
  )

module.exports = () => httpServer
