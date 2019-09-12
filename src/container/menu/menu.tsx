import * as React from 'react'
import { useDispatch } from 'react-redux'
import { _getMapByPage } from '@redux/map.redux'

const { useEffect } = React

const Menu = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(_getMapByPage())
  }, [])

  return (
    <h1>我是菜单</h1>
  )
}

export default Menu