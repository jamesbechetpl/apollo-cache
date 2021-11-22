import { gql } from "@apollo/client";


export const gqlStateCustomerFields = ['isSignedIn']
export const CUSTOMER_QUERY_HOOK = gql`
    query gqlStateCustomer {
        gqlState_Customer @client {
            ${gqlStateCustomerFields.join(',')}
        }
    }
`

export const PPN_PHONEBOOK_QUERY_HOOK = gql`
    query getPhoneNumber(
        $currencyCode: String
        $isSignedIn: Boolean
    ) {
        gqlState_Customer @client {
            isSignedIn @export(as: "isSignedIn")
        }
        phoneBook(
            currencyCode: $currencyCode
            isSignedIn: $isSignedIn
        ) {
            dp
            passive
            phoneNumber
            privateRatesStatus
            status
        }
    }
`
