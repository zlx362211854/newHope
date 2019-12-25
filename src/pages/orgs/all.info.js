import React from 'react'
import {Popconfirm} from 'antd'
export function columnsCreator(handleDel) {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '组织形式',
      dataIndex: 'type',
      key: 'type',
      render(text) {
        switch (text) {
          case 'company':
            return '公司'
          case 'department':
            return '部门'
          case 'team':
            return '团体'
        }
      }
    },
    {
      title: '操作',
      dataIndex: '_id',
      key: '_id',
      render(text) {
        return (<Popconfirm
          title="确认删除嘛?"
          onConfirm={() => handleDel(text)}
          okText="确定"
          cancelText="取消"
        >
          <a>{"删除"}</a>
        </Popconfirm>)
      }
    }
  ];
}