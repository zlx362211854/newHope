import React, {useEffect} from 'react'
import {Form, Input} from 'antd'
const {TextArea} = Input
import {connect} from 'dva'
function First(props) {
  const {dispatch} = props
  const formItemLayout = {
    labelCol: {
      xs: {span: 3}
    },
    wrapperCol: {
      xs: {span: 21}
    }
  }
  const {getFieldDecorator, validateFields, setFieldsValue} = props.form
  useEffect(() => {
    dispatch({
      type: 'process/updateState',
      payload: {
        submit
      },
    });
  }, [])
  useEffect(() => {
    setFieldsValue({
      title: props.params.title,
      content: props.params.content
    })
  }, [props.params])
  const submit = () => {
    return new Promise((resolve) => {
      validateFields((err, values) => {
        if (!err) {
          resolve(values)
        }
      })
    })
  }
  return (
    <Form {...formItemLayout}>
      <Form.Item label={"标题"}>
        {getFieldDecorator("title", {
          rules: [
            {
              required: true,
              message: "请填写一个标题"
            },
            {
              max: 32,
              message: "最多输入32个字符"
            }
          ]
        })(<Input placeholder={"填写一个标题"}/>)}
      </Form.Item>
      <Form.Item label={"内容"}>
        {getFieldDecorator("content", {
          rules: [
            {
              required: true,
              message: "请填写内容"
            }
          ]
        })(<TextArea placeholder={"填写一些说明..."} rows={4}/>)}
      </Form.Item>
    </Form>
  )
}
export default connect((state) => ({
  ...state.process
}), null)(Form.create('first')(First))