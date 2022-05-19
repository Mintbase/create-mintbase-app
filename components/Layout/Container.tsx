const Container = ({
  children,
  className = '',
}: {
  children: JSX.Element[] | JSX.Element
  className?: string
}) => <div className={`mx-12 sm:mx-24 md:mx-64 ${className}`}>{children}</div>

export default Container
