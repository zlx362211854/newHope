import React, {useState, useEffect} from 'react'
import {Table} from 'antd'
import {columnsCreator} from './all.info'
import {orgs} from 'request'
function OrgsList() {
  const [data, setData] = useState([])
  useEffect(() => {
    getList()
  }, [])
  const getList = () => {
    orgs.getOrgsList({}).then(resp => {
      if (resp.code === 1000) {
        setData(resp.data)
      }
    })
  }
  const handleDel = (id) => {
    orgs.removeOrg({
      params: {id}
    }).then(resp => {
      if (resp.code === 1000) {
        getList()
      }
    })
  }
  const columns = columnsCreator(handleDel)
  return (
    <div>
      <h1>{"所有组织"}</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
export default OrgsList