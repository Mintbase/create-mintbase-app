import { MbText } from 'mintbase-ui'
import Image from 'next/image'
import styles from './Card.module.css'

const Card = ({
  title,
  team,
  description,
  deadline,
  picture
}: {
  title: string
  team: string
  description: string
  deadline: string
  picture: object
}) => {
  return (
    <div className={styles.card}>
    <div className={styles.text}>
        <h2>{title}</h2>
        <h3>{description}</h3>
      </div>
      <Image
      src={picture.src}
      alt="Picture of the author"
      layout='fill'
      objectFit='cover'
      objectPosition="center"
      className={styles.image}
    />
    </div>
  )
}

export default Card
