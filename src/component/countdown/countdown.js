import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import styles from './style.module.sass'

const CountDown = props => {
  const [count, setCount] = useState(props.num)
  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 1) {
        setCount(count - 1)
      } else {
        props.countEnd()
        clearInterval(timer)
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [count])

  return (
    <Button className={styles.count}>{count}秒</Button>
  )
}

export default CountDown

