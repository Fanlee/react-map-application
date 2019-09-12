import { commit } from '@common/ts/server'
/**
 * 地图相关接口
 */

export interface Params {
  [p: string]: any
}
// 分页获取地图
export function getMapByPage(params: Params) {
  return commit({
    url: '/saas/platform/map/getMapByPage',
    params
  })
}