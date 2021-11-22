import React from 'react'
import './styles.css'
import {
  useQuery,
  NetworkStatus,
  gql
} from '@apollo/client'
import {
  CUSTOMER_QUERY_HOOK,
  PPN_PHONEBOOK_QUERY_HOOK
} from './graphql'

const App = ({ client }) => {
  const [currencyCode, setCurrencyCode] = React.useState('GBP')

  React.useEffect(() => {
    const query = gql`${CUSTOMER_QUERY_HOOK}`
    client.writeQuery({
      query,
      data: {
        isSignedIn: false,
        __typename: 'GqlStateCustomer'
      },
      variables: {}
    })
    try {
      console.log('hey: ', client.readQuery(query))
    } catch (error) {
      console.error(error)
    }
  }, [client])

  const {
    data,
    loading,
    error,
    networkStatus
  } = useQuery(PPN_PHONEBOOK_QUERY_HOOK, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
    variables: {
      currencyCode
    }
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  const isInitialLoading = networkStatus === NetworkStatus.loading

  console.log('data:', data)
  const testData = data?.phoneBook || {}

  return (
    <div className='App'>
      <div>
        {isInitialLoading
          ? <> Loading Data </>
          : <>{JSON.stringify(testData)}</>}
      </div>
      <button onClick={() => setCurrencyCode('USD')}>Change currency</button>
    </div>
  )
}

export default App
