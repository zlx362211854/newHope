import React from 'react'
import {Popconfirm, Badge} from 'antd'
export function columnsCreator(handleDel, handlePass) {
  return [
    {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属公司或组织',
      dataIndex: 'org',
      key: 'org',
      render(text, record) {
        return (
          <div>
            <h4 className="font_color_title">{record.org && record.org.name}</h4>
            <div className="font_color_content">
              {record.org.description}
            </div>
          </div>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'type',
      key: 'type',
      render(text) {
        switch (text) {
          case '0':
            return <Badge color={'yellow'} text={'未审核'} />
          case '1':
            return <Badge color={'green'} text={'已审核'} />
        }
      }
    },
    {
      title: '操作',
      dataIndex: '_id',
      key: '_id',
      render(text, record) {
        return (
          <div>
            {record.type == '0' &&
              <Popconfirm
                title="确认通过吗?"
                onConfirm={() => handlePass(text)}
                okText="确定"
                cancelText="取消"
              >
                <a className={'font_color_link'} style={{marginRight: '10px'}}>{"通过审核"}</a>
              </Popconfirm>
            }
            <Popconfirm
              title="确认删除吗?"
              onConfirm={() => handleDel(text)}
              okText="确定"
              okType="danger"
              cancelText="取消"
            >
              <a className={'font_color_red'}>{"删除"}</a>
            </Popconfirm>
          </div>
        )
      }
    }
  ];
}