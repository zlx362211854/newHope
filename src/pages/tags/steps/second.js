import React from 'react'
import {Upload, Icon, message} from 'antd'

const {Dragger} = Upload
export default function Second() {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const {status} = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    }
  }
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">{"点击或拖拽文件到此处上传"}</p>
      <p className="ant-upload-hint">{"可选择一个或多个文件上传"}</p>
    </Dragger>
  )
}