import React, {useState, useEffect} from 'react'
import {Table, message} from 'antd'
import {columnsCreator} from './all.info'
import {user} from 'request'
function UserList() {
  const [data, setData] = useState([])
  useEffect(() => {
    getList()
  }, [])
  const getList = () => {
    user.getUsers({}).then(resp => {
      if (resp.code === 1000) {
        setData(resp.data)
      }
    })
  }
  const handleDel = (id) => {
    user.remove({
      params: {id}
    }).then(resp => {
      if (resp.code === 1000) {
        message.success('删除成功!')
        getList()
      }
    })
  }
  const handlePass = (id) => {
    user.passUser({
      params: {
        id
      }
    }).then(resp => {
      if (resp.code === 1000) {
        message.success('审核通过!')
        getList()
      }
    })
  }
  const columns = columnsCreator(handleDel, handlePass)
  return (
    <div>
      <h1>{"所有用户"}</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
export default UserList