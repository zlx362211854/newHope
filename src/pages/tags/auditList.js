import React, {useEffect, useState} from 'react'
import {Table, Drawer, message} from 'antd'
import {process} from 'request'
import Viewer from 'react-viewer'
import DrawerContent from './drawerContent'
import {aduitColumnsCreator} from './list.info'
function AuditList() {
  const [data, setData] = useState([])
  const [fileList, setFileList] = useState([])
  const [currentDrawer, setCurrentDrawer] = useState()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [viewerVisible, setViewerVisible] = useState(false)
  useEffect(() => {
    getList()
  }, [])
  const getList = () => {
    process.getAuditList({}).then(resp => {
      if (resp.code === 1000) {
        setData(resp.data)
      }
    })
  }
  const handleFileClick = (files) => {
    const srcs = []
    files.forEach(i => {
      if (i.file.type && i.file.type.split('/')[0] === 'image') {
        srcs.push({src: '/api/' + i.file.name, alt: i.displayName})
      }
    })
    if (srcs.length > 0) {
      setFileList(srcs)
      setViewerVisible(true)
    }
  }
  const triggerDrawer = (record) => {
    setDrawerVisible(!drawerVisible)
    setCurrentDrawer(record)
  }
  const onDrawerOk = (value) => {
    setDrawerVisible(!drawerVisible)
    process.assign({
      params: {
        id: currentDrawer._id,
        target: value
      }
    }).then(resp => {
      if (resp.code === 1000) {
        message.success('操作成功!')
        getList()
      }
    })
  }
  const columns = aduitColumnsCreator(handleFileClick, triggerDrawer)
  return (
    <div>
      <h1>待审核列表</h1>
      <Table columns={columns} dataSource={data} />
      <Viewer
        visible={viewerVisible}
        onClose={() => {setViewerVisible(false)}}
        images={fileList}
      />
      <Drawer
        title="指派给"
        placement="right"
        closable={false}
        onClose={() => {
          setDrawerVisible(false)
        }}
        visible={drawerVisible}
        getContainer={false}
        style={{position: 'fixed'}}
      >
        {currentDrawer &&
          <DrawerContent
            item={currentDrawer}
            onOk={onDrawerOk}
          />
        }
      </Drawer>
    </div>
  )
}
export default AuditList