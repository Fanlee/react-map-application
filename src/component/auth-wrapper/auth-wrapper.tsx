import * as React from 'react'
import styles from './style.module.sass'

interface Iprops {
  children: any,
  text: string
}

const AuthWrapper = (props: Iprops) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.logo}>
          <img src={`${require(`../../common/image/logo.png`)}`} alt="logo" />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <div className={styles.name}>{props.text}</div>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default AuthWrapper