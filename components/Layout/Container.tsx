import styles from './Container.module.css'

const Container = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element
}) => <div className={styles.container}>{children}</div>

export default Container
