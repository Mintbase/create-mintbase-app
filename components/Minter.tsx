import { useForm } from 'react-hook-form'

import { MetadataField } from 'mintbase'

import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'

import { useState, useEffect } from 'react'

import { useWallet } from '../services/providers/MintbaseWalletContext'

const FETCH_MINTER_STORE = gql`
  query FetchMinterStores($minter: String!) {
    store(where: { minters: { account: { _eq: $minter } } }) {
      id
    }
  }
`

const Minter = () => {
  const { wallet, isConnected, details } = useWallet()
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [isMinting, setIsMinting] = useState<boolean>(false)

  const [fetchStores, { called, loading, data }] = useLazyQuery(
    FETCH_MINTER_STORE,
    { variables: { minter: details.accountId } }
  )

  useEffect(() => {
    if (!isConnected) return

    fetchStores()
  }, [isConnected])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleCoverImage = (e: any) => {
    const file = e.target.files[0]

    setCoverImage(file)
  }

  const onSubmit = async (data: any) => {
    if (!wallet || !wallet.minter) return
    if (!coverImage) return

    setIsMinting(true)

    const { data: fileUploadResult, error: fileError } =
      await wallet.minter.uploadField(MetadataField.Media, coverImage)

    if (fileError) {
      console.error(fileError)
      return
    }

    wallet.minter.setMetadata({
      title: data.title,
      description: data.description,
    })

    setIsMinting(false)

    wallet.mint(1, data.store, undefined, undefined, undefined)
  }

  if (!isConnected) return <div>Connect your wallet</div>

  if (loading) return <div>Loading...</div>

  return (
    <div className="w-full">
      <form
        className="bg-white rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <h1 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
            Simple Minter
          </h1>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contract
          </label>

          <select
            {...register('store', { required: true })}
            className="text-sm"
          >
            {data?.store.map((store: { id: string }) => (
              <option key={store.id} value={store.id}>
                {store.id}
              </option>
            ))}
          </select>

          {errors.store && (
            <p className="text-red-500 text-xs italic">
              Please select a store.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            {...register('title', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Title"
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">Please add title.</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            {...register('description', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Description"
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              Please add a description.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Attach Cover Image
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
              <div className="h-full w-full text-center flex flex-col items-center justify-center">
                {!coverImage && (
                  <p className="pointer-none text-gray-500 ">Select a file</p>
                )}
                {coverImage && (
                  <p className="pointer-none text-gray-500">
                    {coverImage.name}
                  </p>
                )}
              </div>
              <input
                {...register('coverImage', { required: true })}
                type="file"
                className="hidden"
                onChange={handleCoverImage}
              />
            </label>
          </div>
          {errors.coverImage && (
            <p className="text-red-500 text-xs italic">
              Please add a cover image.
            </p>
          )}
        </div>

        {isMinting ? (
          <div className="w-full py-2 px-4 rounded bg-gray-200 text-center text-black font-bold mb-2">
            Creating your mint transaction...
          </div>
        ) : (
          <div className="flex items-center flex-row-reverse justify-between">
            <input
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Mint"
            />
          </div>
        )}
      </form>
    </div>
  )
}

export default Minter
