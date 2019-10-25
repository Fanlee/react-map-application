import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Radio, Button } from 'antd'
import { _login } from '@redux/user.redux'
import useAuthValida from '@hook/useAuthValida'
import * as styles from './style.module.sass'

const UserCenter = ({ form }: any) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: any) => state.user)
  const { getFieldDecorator } = form
  const { validatePhoneNumber, compareToFirstPassword } = useAuthValida(form)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields((err: any, values: any) => {
      if (!err) {
        dispatch(_login(values))
      }
    })
  }

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  }

  return (
    <div className={styles.wrapper}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item label="账号" {...formItemLayout}>
          <Input defaultValue={userInfo.userAccount} disabled={true} />
        </Form.Item>
        <Form.Item label="角色" {...formItemLayout}>
          <Input defaultValue={userInfo.userRoleName} disabled={true} />
        </Form.Item>
        <Form.Item label="昵称" {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: userInfo.userName,
            rules: [{ required: true, message: '请输入昵称！' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="电话" {...formItemLayout}>
          {getFieldDecorator('telNum', {
            initialValue: userInfo.telNum,
            rules: [
              { required: true, message: '请输入电话号码！' },
              { validator: validatePhoneNumber }
            ],
          })(<Input placeholder="请输入手机号" />)}
        </Form.Item>
        <Form.Item label="电话" {...formItemLayout}>
          {getFieldDecorator('telNum', {
            initialValue: userInfo.telNum,
            rules: [
              { required: true, message: '请输入电话号码！' },
              { validator: validatePhoneNumber }
            ],
          })(<Input placeholder="请输入手机号" />)}
        </Form.Item> 
        <Form.Item label="邮箱" {...formItemLayout}>
          {getFieldDecorator('mailbox', {
            initialValue: userInfo.mailbox,
            rules: [
              { required: true, message: '请输入邮箱地址！' },
            ],
          })(<Input placeholder="请输入手机号" />)}
        </Form.Item>
        <Form.Item label="性别" {...formItemLayout}>
          {getFieldDecorator('sex', {
            initialValue: userInfo.sex
          })(
            <Radio.Group>
              <Radio value={0}>女</Radio>
              <Radio value={1}>男</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="重置密码" {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码！' },
              { validator: compareToFirstPassword }
            ]
          })(<Input.Password type="password" placeholder="请输入密码" />)}
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit" className={styles.button}>提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(UserCenter)