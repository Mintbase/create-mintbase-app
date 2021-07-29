import 'react-jinke-music-player/assets/index.css'
import dynamic from 'next/dynamic'
const PlayerWithNoSSR = dynamic(() => import('react-jinke-music-player'), {
  ssr: false,
})

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const FETCH_MUSIC = gql`
  query GetAllMusic {
    metadata(
      where: {
        _and: {
          animation_type: { _ilike: "%audio%" }
          media_hash: { _is_null: false }
        }
      }
    ) {
      media
      animation_url
      animation_hash
      title
    }
  }
`

const MusicPlayer = () => {
  const [musicList, setMusicList] = useState<any | []>([])
  const { data, loading } = useQuery(FETCH_MUSIC)

  useEffect(() => {
    if (!data) return

    if (data?.metadata.length === 0) return

    const musicListRaw = data?.metadata

    const _music = musicListRaw.map((item: any) => {
      return {
        name: item.title,
        musicSrc: `https://coldcdn.com/api/cdn/bronil/${item.animation_hash}`,
        cover: item.media,
      }
    })

    setMusicList(_music)
  }, [data])

  return (
    <>{musicList.length > 0 && <PlayerWithNoSSR audioLists={musicList} />}</>
  )
}

export default MusicPlayer
