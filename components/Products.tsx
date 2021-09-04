import { useQuery } from '@apollo/client'
import { gql } from 'apollo-boost'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useWallet } from '../services/providers/MintbaseWalletContext'

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
        where: { storeId: { _eq: $storeId }, burnedAt: { _is_null: true }, list: {removedAt: {_is_null: true}}}
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
          tokens(distinct_on: id, where: {list: {removedAt: {_is_null: true}}}) {
            minter
            id
            list {
              price
            }
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

const useBuy = (tokenID: string, tokenPrice: string) => {
  const { wallet } = useWallet();
  const tokenPriceNumber = Number(tokenPrice) ;
  tokenPrice = (tokenPriceNumber).toLocaleString('fullwide', {useGrouping:false})
  const buy = () => {
    // create marketAddress env variable for testnet/mainnet
    // wallet?.makeOffer(tokenID,tokenPrice,{ marketAddress: process.env.marketAddress})
    wallet?.makeOffer(tokenID,tokenPrice)
  }
  return buy;
}

const NFT = ({ media, title, tokens }: { media: string; title: string; tokens: Token[] }) => {
  //const NFT = ({ media, title }: { media: string; title: string}) => {
  const { wallet, isConnected, details } = useWallet();

  const buy = useBuy(tokens[0]['id'],tokens[0].list.price) ;
  
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-3 mb-4">
      <div className="h-96">
        <div className="relative items-center min-h-full">
          <a href={`${media}`}>
            <Image alt={title} src={media} layout="fill" objectFit="contain" />
          </a>
        </div>
        <div>
         { isConnected &&
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={buy}>Buy</button>
         }
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
  tokens: Token[]
  metadata: {
    title: string
    media: string
  }
  memo: string
  metaId: string
}

type Token = {
  id: string
    list: {
      price: string
    }
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
                tokens={thing.tokens}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Products
