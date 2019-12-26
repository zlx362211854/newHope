import React, {useEffect, useState} from 'react'
import {Table} from 'antd';
import {process} from 'request'
import Viewer from 'react-viewer';
import router from 'umi/router';
import {aduitColumnsCreator} from './list.info'
function AuditList() {
  const [data, setData] = useState([])
  const [fileList, setFileList] = useState([])
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
  const columns = aduitColumnsCreator(handleFileClick)
  return (
    <div>
      <h1>待审核列表</h1>
      <Table columns={columns} dataSource={data} />
      <Viewer
        visible={viewerVisible}
        onClose={() => {setViewerVisible(false);}}
        images={fileList}
      />
    </div>
  )
}
export default AuditList