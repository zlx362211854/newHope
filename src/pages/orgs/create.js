import React from 'react'
import {Form, Input, Select, Button, message} from 'antd'
import {orgs} from 'request'
import router from 'umi/router';
const {TextArea} = Input
const {Option} = Select
function CreateOrg(props) {
  const {getFieldDecorator, validateFields} = props.form
  const submit = () => {
    validateFields((err, values) => {
      if (!err) {
        console.log(values)
        orgs.create({
          params: values
        }).then(resp => {
          if (resp.code === 1000) {
            message.success('创建成功!')
            router.push('/orgs/all')
          }
        })
      }
    })
  }
  return (
    <div>
      <h1>{"新建组织"}</h1>
      <Form style={{width: '500px', margin: '0 auto'}}>
        <Form.Item label={"组织名称"}>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "请填写名称"
              },
              {
                max: 32,
                message: "最多输入32个字符"
              }
            ]
          })(<Input placeholder={"填写一个标题"} />)}
        </Form.Item>
        <Form.Item label={"组织说明"}>
          {getFieldDecorator("description", {})(<TextArea placeholder={"填写一些说明..."} rows={4} />)}
        </Form.Item>
        <Form.Item label={"组织形式"}>
          {getFieldDecorator("type", {
            initialValue: 'company'
          })(
            <Select>
              <Option value="company">{"公司"}</Option>
              <Option value="department">{"部门"}</Option>
              <Option value="team">{"团体"}</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={submit}>
            {"确定"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Form.create('CreateOrg')(CreateOrg)