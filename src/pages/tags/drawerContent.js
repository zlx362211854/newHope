import React, {useState, useEffect} from 'react'
import {Select, Button} from 'antd'
import {user} from 'request'
const {Option} = Select
function DrawerContent(props) {
  const {item: {title, content, creator = {}, conductor = {}}} = props
  const [users, setUsers] = useState([])
  const [value, setValue] = useState('me')
  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = () => {
    user.getUsers({}).then(resp => {
      if (resp.code === 1000) {
        setUsers(resp.data)
      }
    })
  }

  const handleChange = (value) => {
    setValue(value)
  }
  return (
    <div>
      <h4 className="font_color_title">{title}</h4>
      <div className="font_color_content">
        {content.length > 30 ? content.substring(0, 30) + '...' : content}
      </div>
      <br />
      <div style={{margin: '10px 10px 10px 0'}}>
        <span className="font_color_title" style={{marginRight: '10px'}}>创建人:</span>
        <span className="font_color_content">{creator.name}</span>
      </div>
      <div style={{margin: '10px 10px 10px 0'}}>
        <span className="font_color_title" style={{marginRight: '10px'}}>公司或组织:</span>
        <span className="font_color_content">{creator.org && creator.org.name}</span>
      </div>
      <div style={{margin: '10px 10px 10px 0'}}>
        <span className="font_color_title" style={{marginRight: '10px'}}>当前受理人:</span>
        <span className="font_color_content">{conductor.name}</span>
      </div>
      <br />
      <span className="font_color_title" style={{marginRight: '10px'}}>选择指派人:</span>
      <Select
        value={value}
        style={{width: 120}}
        showSearch
        placeholder="选择指派人"
        filterOption={false}
        onChange={handleChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option key={'me'}>我自己</Option>
        {users.map(d => (
          <Option key={d._id}>{d.name}</Option>
        ))}
      </Select>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button onClick={() => props.onOk(value)} type="primary">确定</Button>
      </div>
    </div>
  )
}
export default DrawerContent