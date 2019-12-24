import React from 'react'
import {List, Empty} from 'antd';
export default function Third(props) {
  const {params: {first, second}} = props
  return (
    <div>
      <h2>{first.title}</h2>
      <p>{first.content}</p>
      <h3>{"附件"}</h3>
      {!second.fileList &&
        <Empty />
      }
      {second.fileList &&
        <List
          size="large"
          header={<div>{"文件列表"}</div>}
          bordered
          dataSource={second.fileList}
          renderItem={item => <List.Item>{item.name}</List.Item>}
        />
      }
    </div>
  )
}