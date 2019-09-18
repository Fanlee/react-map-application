import * as React from 'react'
import { Result } from 'antd'

const NoMatch = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面走丢了，您可长点心吧！！"
    /> 
  )
}

export default NoMatch