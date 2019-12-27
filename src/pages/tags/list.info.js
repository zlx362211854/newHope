import React from 'react'
import {Avatar, Badge, Drawer} from 'antd'
import moment from 'moment'
import Link from 'umi/link';
export function columnsCreator(handleFileClick) {
  return [
    {
      title: '发起人',
      dataIndex: 'name',
      key: 'name',
      render(text, record) {
        return (
          <div className="text_align">
            <Avatar src={record.creator.avatar ? '/api/' + record.creator.avatar.name : ''} />
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
              {text.length > 80 ? text.substring(0, 80) + '...' : text}
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(text, record) {
        // 状态 submitted: 已提交，accepted: 已接收， processing: 处理中， done: 已完成
        switch (text) {
          case 'submitted':
            return <Badge color={'blue'} text={'已提交'} />
          case 'accepted':
            return <Badge color={'cyan'} text={'已接收'} />
          case 'processing':
            return <Badge color={'orange'} text={'处理中'} />
          case 'done':
            return <Badge color={'green'} text={'已完成'} />
        }
      },
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
      dataIndex: '_id',
      key: '_id',
      render: (text, record) => (
        <span>
          <span>
            <Link to={'/tags/list/' + text}>{"查看"}</Link>
          </span>
        </span>
      ),
    },
  ];
}

export function aduitColumnsCreator(handleFileClick, triggerDrawer) {
  return [
    {
      title: '发起人',
      dataIndex: 'name',
      key: 'name',
      render(text, record) {
        return (
          <div className="text_align">
            <Avatar src={record.creator.avatar ? '/api/' + record.creator.avatar.name : ''} />
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
              {text.length > 80 ? text.substring(0, 80) + '...' : text}
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(text, record) {
        // 状态 submitted: 已提交，accepted: 已接收， processing: 处理中， done: 已完成
        switch (text) {
          case 'submitted':
            return <Badge color={'blue'} text={'已提交'} />
          case 'accepted':
            return <Badge color={'cyan'} text={'已接收'} />
          case 'processing':
            return <Badge color={'orange'} text={'处理中'} />
          case 'done':
            return <Badge color={'green'} text={'已完成'} />
        }
      },
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
      dataIndex: '_id',
      key: '_id',
      render: (text, record) => (
        <span>
          <Link to={'/tags/auditList/' + text}>{"查看"}</Link>
          <a style={{marginLeft: '10px'}} onClick={() => triggerDrawer(record)}>{"指派给"}</a>
        </span>
      ),
    },
  ];
}
export const stepsMap = {
  submitted: {title: '已提交', color: 'blue', index: 0},
  accepted: {title: '已接收', color: 'cyan', index: 1},
  processing: {title: '处理中', color: 'orange', index: 2},
  done: {title: '已完成', color: 'green', index: 3},
  reject: {title: '驳回', color: 'red', index: 3}
}