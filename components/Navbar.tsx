import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full bg-white md:pt-0 px-6 shadow-lg relative z-20 border-t border-b border-gray-400">
      <div className="container mx-auto max-w-4xl md:flex justify-between items-center text-sm md:text-md md:justify-start">
        <div className="w-full md:w-1/2 text-center md:text-left py-4 flex flex-wrap justify-center items-stretch md:justify-start md:items-start">
          <a
            href="#"
            className="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-400"
          >
            Home
          </a>
          <a
            href="#"
            className="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-400"
          >
            Products
          </a>
          <a
            href="#"
            className="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-400"
          >
            About Us
          </a>
          <a
            href="#"
            className="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-400"
          >
            News
          </a>
          <a
            href="#"
            className="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline"
          >
            Contact
          </a>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-right pb-4 md:p-0">
          <input
            type="search"
            placeholder="Search..."
            className="bg-gray-300 border text-sm p-1"
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
