import * as React from 'react'
import { Button } from 'antd'
import styles from './style.module.sass'

const { useState, useEffect } = React

interface Iprops {
  num: number;
  countEnd(): void
}

const CountDown = (props: Iprops) => {
  const [count, setCount] = useState<number>(props.num)
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

