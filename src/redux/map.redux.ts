import { message } from 'antd'
import { getMapByPage } from '@api/map'

enum ActionType {
  SAVE_MAP_LIST = 'SAVE_MAP_LIST'
}

const initState = {
  mapList: {
    dataList: {},
    currPage: 1,
    totalPage: 1,
    recordCount: 1
  }
}

interface InitState {
  mapList: {
    dataList: object
    currPage: number
    totalPage: number
    recordCount: number
  }
}

interface Action {
  type: ActionType,
  payload?: any
}

export function mapInfo(state: InitState = initState, action: Action) {
  switch (action.type) {
    case ActionType.SAVE_MAP_LIST:
      return { ...state, mapList: { ...action.payload } }
    default:
      return state
  }
}

type Creator = (data: any) => { type: ActionType, payload: any }

export const saveMapList:Creator = data => ({ type: ActionType.SAVE_MAP_LIST, payload: data })

// 获取地图列表
export const _getMapByPage = (pageNum = 1, pageSize = 1) => {
  return async (dispatch: any) => {
    try {

      const res: any = await getMapByPage({ pageNum, pageSize })
      dispatch(saveMapList(res.result))
    } catch (err) {
      message.error('地图列表查询失败！')
    }
  }
}