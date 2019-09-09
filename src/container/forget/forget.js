import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, Row, Col } from 'antd'
import { _resetPassword } from '@redux/user.redux'
import AuthWrapper from '@component/auth-wrapper/auth-wrapper'
import CountDown from '@component/countdown/countdown'
import useAuthValida from '@hook/useAuthValida'
import useSendMSG from '@hook/useSendMSG'
import styles from './style.module.sass'

const Forget = ({ form }) => {
  const dispatch = useDispatch()
  const resetPW = useSelector(state => state.user.resetPW)

  const { getFieldDecorator } = form
  const {
    validatePhoneNumber,
    compareToFirstPassword,
    validateToNextPassword,
    validateCode,
  } = useAuthValida(form)

  const { isSend, setSend, sendMsg } = useSendMSG(form)

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        dispatch(_resetPassword(values))
      }
    })
  }

  return (
    <>
      {resetPW ? <Redirect to={'/login'} /> : null}
      <AuthWrapper text="忘记密码">

        <div className={styles.form}>
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('userAccount', {
                rules: [
                  { required: true, message: '请输入手机号！' },
                  { validator: validatePhoneNumber }
                ],
              })(<Input placeholder="请输入手机号" />)}
            </Form.Item>
            <Form.Item>
              <Row gutter={12}>
                <Col span={16}>
                  {getFieldDecorator('code', {
                    rules: [
                      { required: true, message: '请输入短信验证码！' },
                      { len: 6, message: '请输入6位短信验证码！' },
                      { validator: validateCode }
                    ],
                  })(<Input placeholder="请输入手机验证码" />)}
                </Col>
                <Col span={6}>
                  {
                    isSend ?
                      <CountDown num={60} countEnd={() => setSend(s => !s)} /> :
                      <Button className={styles.btnSend} onClick={sendMsg}>发送短信</Button>
                  }
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入新密码！' },
                  { validator: compareToFirstPassword }
                ],
              })(<Input.Password type="password" placeholder="请输入密码" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('confirm', {
                rules: [
                  { required: true, message: '请确认新密码！' },
                  { validator: validateToNextPassword }
                ],
              })(<Input.Password type="password" placeholder="请确认密码" />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.button}>重置密码</Button>
            </Form.Item>
          </Form>
          <div className={styles.tip}><Link to="/login">返回登录</Link></div>
        </div>
      </AuthWrapper>
    </>
  )
}

export default Form.create()(Forget)