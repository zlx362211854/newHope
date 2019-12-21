import React, {useEffect} from 'react'
import {Form, Input} from 'antd'
const {TextArea} = Input
import {connect} from 'dva'
const namespace = 'process'
const mapStateToProps = (state) => {
	const store = state[namespace]
	return {
	  ...store 
	}
}
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
  const {getFieldDecorator} = props.form
  useEffect(() => {
    dispatch({
      type: 'process/updateState',
      payload: {
        submit
      },
    });
  }, [])
  const submit = () => {
    return new Promise((resolve) => {
      props.form.validateFields((err, values) => {
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
              message: "请输入标题"
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
              message: "请输入内容"
            }
          ]
        })(<TextArea placeholder={"填写一些说明..."} rows={4}/>)}
      </Form.Item>
    </Form>
  )
}
export default connect(mapStateToProps, null)(Form.create('first')(First))