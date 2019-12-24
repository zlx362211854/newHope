import React, {useEffect, useState} from 'react'
import {Table} from 'antd';
import Viewer from 'react-viewer';
import {process} from 'request'
import {columnsCreator} from './list.info'

export default function List() {
  const [data, setData] = useState([])
  const [fileList, setFileList] = useState([])
  const [viewerVisible, setViewerVisible] = useState(false)
  useEffect(() => {
    process.getOwnList({}).then((resp) => {
      if (resp.code === 1000) {
        setData(resp.data)
      }
    })
  }, [])
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
  const columns = columnsCreator(handleFileClick)
  return (
    <div>
      <h1>{"我的申请列表"}</h1>
      <Table columns={columns} dataSource={data} />
      <Viewer
        visible={viewerVisible}
        onClose={() => {setViewerVisible(false);}}
        images={fileList}
      />
    </div>
  )
}