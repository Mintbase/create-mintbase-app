import { useQuery } from '@apollo/client'
import { gql } from 'apollo-boost'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const FETCH_STORE = gql`
  query FetchStore($storeId: String!, $limit: Int = 20, $offset: Int = 0) {
    store(where: { id: { _eq: $storeId } }) {
      id
      name
      symbol
      baseUri
      owner
      minters {
        account
        enabled
      }

      tokens(
        order_by: { thingId: asc }
        where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true } }
        limit: $limit
        offset: $offset
        distinct_on: thingId
      ) {
        id
        thingId
        thing {
          id
          metaId
          memo
          tokens {
            minter
          }
          metadata {
            title
            media
          }
        }
      }
    }
  }
`

const NFT = ({ media, title }: { media: string; title: string }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-3 mb-4">
      <div className="h-96">
        <div className="relative items-center min-h-full">
          <a href={`${media}`}>
            <Image alt={title} src={media} layout="fill" objectFit="contain" />
          </a>
        </div>
      </div>
    </div>
  )
}

type Store = {
  id: string
  name: string
  symbol: string
  baseUri: string
  owner: string
  minters: {
    account: string
    enabled: string
  }[]
}

type Thing = {
  id: string
  metadata: {
    title: string
    media: string
  }
  memo: string
  metaId: string
}

const Products = ({ storeId }: { storeId: string }) => {
  const [store, setStore] = useState<Store | null>(null)
  const [things, setThings] = useState<Thing[] | []>([])

  const { data, loading } = useQuery(FETCH_STORE, {
    variables: {
      storeId: storeId,
      limit: 10,
      offset: 0,
    },
  })

  useEffect(() => {
    if (!data) return

    if (data?.store.length === 0) return

    setStore({
      ...data.store[0],
    })

    const things = data.store[0].tokens.map((token: any) => token.thing)

    setThings(things)
  }, [data])

  return (
    <div className="w-full  px-6 py-12 bg-gray-100 border-t">
      {!loading && (
        <>
          <h1 className="text-center text-xl text-gray-600 md:text-4xl px-6 py-12">
            {store?.name}
          </h1>
          <div className="container max-w-8xl mx-auto pb-10 flex flex-wrap">
            {things.map((thing: Thing) => (
              <NFT
                key={thing.metaId}
                title={thing.metadata.title}
                media={thing.metadata.media}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Products
