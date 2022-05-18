import Navbar from './Navbar'

const Base = ({ children }: { children: JSX.Element }) => {
  return (
    <div className={`bg-gray-100 dark:bg-gray-900 dark`}>
      {/* <Navbar></Navbar> */}
      <div className="flex flex-col justify-between min-h-screen">
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Base
