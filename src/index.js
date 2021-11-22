import React from 'react'
import ReactDOM from 'react-dom'
import { gqlStateCustomerFields } from './graphql'
import App from './App'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from '@apollo/client'

export const getDefaultFieldPolicies = (fields) => {
  const policies = {}
  fields.forEach((field) => {
    policies[field] = {
      read(value = null) {
        console.log('hey: ', field)
        return value
      },
    }
  })
  return policies
}

const client = new ApolloClient({
  uri: 'https://www.priceline.com/pws/v0/pcln-graph/',
  cache: new InMemoryCache({
    typePolicies: {
      GqlStateCustomer: {
        fields: getDefaultFieldPolicies(gqlStateCustomerFields),
      },
      Query: {
        fields: {
          isSignedIn: {
            read(value = null) {
              console.log('isSignedIn: ')
              return value
            },
          },
          gqlState_Customer: {
            fields: getDefaultFieldPolicies(gqlStateCustomerFields),
          }
          // gqlState_Customer: {
          //   fields: { // Field policy map for the Product type
          //     isSignedIn: { // Field policy for the isInCart field
          //       read (_, { variables }) { // The read function for the isInCart field
          //         console.log('here')
          //         return false
          //       }
          //     }
          //   }
          // }
        }
      }
    }
  })
})

const rootElement = document.getElementById('root')
ReactDOM.render(<ApolloProvider client={client}>
  <App client={client}/>
</ApolloProvider>, rootElement)
