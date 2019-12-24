import React from 'react'
import {Avatar} from 'antd'
import moment from 'moment'
export function columnsCreator(handleFileClick) {
  return [
    {
      title: '发起人',
      dataIndex: 'name',
      key: 'name',
      render(text, record) {
        return (
          <div>
            <Avatar src={'/api/' + record.creator.avatar.name} />
            <br />
            <span className="font_color_content">{record.creator.name}</span>
          </div>
        )
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 300,
      render(text, record) {
        return (
          <div>
            <h4 className="font_color_title">{record.title}</h4>
            <div className="font_color_content">
              {text.length > 140 ? text.substring(0, 140) + '...' : text}
            </div>
          </div>
  
        )
      }
    },
    {
      title: '文件',
      dataIndex: 'files',
      key: 'files',
      render(text, record) {
        return (
          <div>
            {record.files.map((i, index) => {
              return <a className=" pointer_cursor block" key={index} onClick={() => handleFileClick(record.files)}>{i.displayName}</a>
            })}
          </div>
  
        )
      }
    },
    {
      title: '申请时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render(text, record) {
        return <span className="font_color_content">{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>{"查看"}</a>
        </span>
      ),
    },
  ];
}