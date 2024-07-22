import {Button, Checkbox, Form, Input, Typography, Divider} from 'antd';
import {Link} from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import TelegramLoginButton from 'telegram-login-button'
import axios from "../../../api/Index.jsx";
import {useDispatch} from "react-redux";
import {ERROR, LOADING, REGISTER_USER} from "../../../redux/action/Types.jsx";

const {Title, Text} = Typography

const Register = () => {
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch({type: LOADING})
      const res = await axios.post("/auth", values)
      const data = res.data.payload
      if (res.status === 200 && data.token) {
        dispatch({type: REGISTER_USER, token: data.token, user: data.user})
      } else {
        throw new Error("Something went wrong")
      }
    } catch (error) {
      console.log(error)
      dispatch({type: ERROR, message: error.res.data.message || error})
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title className="text-center block pb-2">Register</Title>

      <Form.Item
        label="Firstname"
        name="first_name"
        rules={[
          {
            required: true,
            message: 'Please input your firstname!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          span: 24,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button className="w-full" type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Divider><Text>Or</Text></Divider>
      <div className="flex justify-center items-center my-4">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <TelegramLoginButton
          botName="test"
          dataOnauth={(user) => console.log(user)}
        />
      </div>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Text className="text-center block"> Already have an account? <Link to="/auth">Log In</Link></Text>
    </Form>
  )
}
export default Register
