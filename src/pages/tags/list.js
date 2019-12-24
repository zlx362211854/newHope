import React, {useEffect, useState} from 'react'
import {Table, Divider, Tag} from 'antd';
import {process} from 'request'
const columns = [
  {
    title: '发起人',
    dataIndex: 'name',
    key: 'name',
    render(text, record) {
      return record.creator.name
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    render(text) {
      return (
        <pre>
          {text}
        </pre>
      )
    }
  },
  {
    title: '文件',
    dataIndex: 'files',
    key: 'files',
    render(text, record) {
      return (
        <pre>
          {record.files.map(i => i.displayName + '\r\n')}
        </pre>
      )
    }
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];
export default function List() {
  const [data, setData] = useState([])
  useEffect(() => {
    process.getOwnList({}).then((resp) => {
      if (resp.code === 1000) {
        setData(resp.data)
      }
    })
  }, [])
  return (
    <div>
      <h1>{"我的申请列表"}</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}