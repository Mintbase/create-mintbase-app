import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { useMemo } from 'react'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

import {
  GRAPH_MAINNET_HTTPS_URI,
  GRAPH_MAINNET_WSS_URI,
} from '../constants/mintbase'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: any

const createApolloClient = (graphUri?: string) => {
  const httpLink = new HttpLink({
    uri: graphUri ?? GRAPH_MAINNET_HTTPS_URI,
    credentials: 'same-origin', 
    headers: {
      'x-hasura-role': 'anonymous',
    },
  })

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: GRAPH_MAINNET_WSS_URI,
        options: {
          reconnect: true,
        },
      })
    : null

  const splitLink = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        // @ts-ignore
        wsLink,
        httpLink
      )
    : httpLink

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: splitLink,
    cache: new InMemoryCache(),
  })

  return client
}

export function initializeApollo(initialState = null, graphUri?: string) {
  const _apolloClient = apolloClient ?? createApolloClient(graphUri)

  if (initialState) {
    const existingCache = _apolloClient.extract()

    // @ts-ignore
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })
    _apolloClient.cache.restore(data)
  }

  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(
    () => initializeApollo(state, pageProps?.network?.graphUri),
    [state]
  )
  return store
}
