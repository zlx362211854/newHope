import Link from 'umi/link';
import router from 'umi/router';
import React, {Component} from 'react';
import style from './signup.less';
import {Form, Icon, Input, Button, message, Avatar, Spin, Select} from 'antd';
import kit from 'utils/kit.js'
import {user, orgs} from 'request';
const {encryptDES} = kit;
class Signup extends Component {
  state = {

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      const {userName, password} = values;
      const key = 'NEWHOPE';
      const pass = encryptDES(password, key);
      const org = values.org.key;
      user.signup({
        params: {
          name: userName,
          pass,
          org
        }
      }).then(req => {
        if (req.code === 1000) {
          message.success('注册成功！');
          router.push('/login')
        }
      })
    });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }
  fetchOrg = value => {
    this.setState({ orgsData: [], fetching: true });
    orgs
      .searchOrg({
        params: {
          name: value,
        },
      })
      .then(res => {
        const { code, data } = res;
        if (code === 1000) {
          this.setState({
            orgsData: data
          });
        }
      });
  };
  handleChange = value => {
    this.setState({
      orgsData: [],
      fetching: false,
    });
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    const {orgsData = [], fetching} = this.state;
    return (
      <div>
        <div className={style.loginPanel}>
          <div className={style.logoContainer}>
            <Avatar size={80} icon="user" />
          </div>
          <Form onSubmit={this.handleSubmit} className={style.form + ' login-form'}>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{required: true, message: '请输入用户名!'}],
              })(
                <Input
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                  placeholder="输入用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码!'}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                  type="password"
                  placeholder="输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('passwordConfirm', {
                rules: [
                  {required: true, message: '请再次输入密码以确认!'},
                  {validator: this.compareToFirstPassword}
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                  type="password"
                  placeholder="确认密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('org', {
                rules: [
                  {required: true, message: '请选择所属公司或组织'},
                ]
              })(
                <Select
                  labelInValue
                  showSearch
                  placeholder="搜索以添加你所属的公司或组织"
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={this.fetchOrg}
                  onChange={this.handleChange}
                  style={{width: '100%'}}
                >
                  {orgsData.map(d => (
                    <Option key={d._id}>{d.name}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={style.loginBtn + " login-form-button"}>
                {"注 册"}
              </Button>
              <Link to="/login" style={{color: 'rgb(49, 48, 56)'}}>{"去登陆"}</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const SignupForm = Form.create({name: 'normal_signup'})(Signup);
export default SignupForm;