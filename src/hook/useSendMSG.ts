import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { _sendMessage } from '@redux/user.redux'

const useSendMSG = (form:any) => {
  // 是否已经发送短信
  const [isSend, setSend] = useState(false)
  const dispatch = useDispatch()

  // 发送手机验证码
  const sendMsg = async () => {
    const err = form.getFieldError('userAccount')
    if (isSend || err) { return }
    const value = form.getFieldValue('userAccount')
    dispatch(_sendMessage(value))
    setSend(s => !s)
  }

  return {
    isSend,
    setSend,
    sendMsg
  }
}

export default useSendMSG