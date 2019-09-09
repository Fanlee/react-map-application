import React from 'react'
import styles from './style.module.sass'

const AuthWrapper = ({ children, text }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={`${require(`../../common/image/logo.png`)}`} alt="logo" />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.name}>{text}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthWrapper