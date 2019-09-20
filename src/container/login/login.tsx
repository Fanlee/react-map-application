import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd'
import AuthWrapper from '@component/auth-wrapper/auth-wrapper'
import { _login } from '@redux/user.redux'
import useAuthValida from '@hook/useAuthValida'
import * as styles from './style.module.sass'

const Login = ({ form }: any) => {
  const dispatch = useDispatch()
  const isLogin = useSelector((state: any) => state.user.userInfo.token)
  const { getFieldDecorator } = form
  const { compareToFirstPassword } = useAuthValida(form)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields((err: any, values: any) => {
      if (!err) {
        dispatch(_login(values))
      }
    })
  }

  return (
    <>
      {isLogin && <Redirect to="/workbench" />}
      <AuthWrapper text="登录">
        <div className={styles.form}>
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('userAccount', {
                rules: [{ required: true, message: '请输入手机号！' }],
              })(<Input placeholder="请输入手机号" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码！' },
                  { validator: compareToFirstPassword }
                ]
              })(<Input.Password type="password" placeholder="请输入密码" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>自动登录</Checkbox>)}
              <Link to="/forget" className={styles.forget}>忘记密码</Link>
              <Button type="primary" htmlType="submit" className={styles.button}>立即登陆</Button>
            </Form.Item>
          </Form>
          <div className={styles.tip}>没有账号，快速<Link to="/register">注册</Link></div>
        </div>
      </AuthWrapper >
    </>
  )
}

export default Form.create()(Login)