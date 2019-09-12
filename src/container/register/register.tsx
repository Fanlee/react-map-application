import * as React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Modal, Input, Button, Checkbox, message, Row, Col } from 'antd'
import { _regist } from '@redux/user.redux'
import AuthWrapper from '@component/auth-wrapper/auth-wrapper'
import CountDown from '@component/countdown/countdown'
import useAuthValida from '@hook/useAuthValida'
import useSendMSG from '@hook/useSendMSG'
import styles from './style.module.sass'

const { useState } = React

const Register = ({form}: { form: any }) => {
  // 阅读服务条款
  const [read, setRead] = useState(true)
  // 显示服务条款
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const { getFieldDecorator } = form
  const {
    validatePhoneNumber,
    compareToFirstPassword,
    validateToNextPassword,
    validateCode,
    validateUserName
  } = useAuthValida(form)

  const { isSend, setSend, sendMsg } = useSendMSG(form)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields((err: any, values: any): any => {
      if (!err) {
        if (!read) {
          return message.warning('请先阅读服务条款！')
        }
        dispatch(_regist(values))
      }
    })
  }

  return (
    <AuthWrapper text="注册">
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
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: '请输入昵称！' },
                { validator: validateUserName }
              ],
            })(<Input placeholder="请输入昵称" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码！' },
                { validator: compareToFirstPassword }
              ],
            })(<Input.Password type="password" placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: '请确认密码！' },
                { validator: validateToNextPassword }
              ],
            })(<Input.Password type="password" placeholder="请确认密码" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('read', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox
              value={read}
              onChange={(e) => setRead(e.target.checked)}>我已阅读并同意</Checkbox>)}
            <a className={styles.read} onClick={() => setVisible(v => !v)}>服务条款</a>
            <Button type="primary" htmlType="submit" className={styles.button}>立即注册</Button>
          </Form.Item>
        </Form>
        <div className={styles.tip}>已有账号，去<Link to="/login">登录</Link></div>
      </div>
      <Modal
        visible={visible}
        title="服务协议"
        footer={null}
        onCancel={() => setVisible(v => !v)}>
        <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
      </Modal>
    </AuthWrapper>
  )
}

export default Form.create()(Register)