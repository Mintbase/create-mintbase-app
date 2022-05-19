import { MbText } from 'mintbase-ui'

const Card = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="flex flex-col w-full h-full rounded bg-mb-background hover:bg-gray-700 cursor-pointer p-4 hover:transition-all ease-in-out duration-700">
      <div>
        <MbText className="h3-130 text-white">{title}</MbText>
      </div>
      <div className='mt-4'>
        <MbText className="p-big-90 text-white">{description}</MbText>
      </div>
    </div>
  )
}

export default Card
