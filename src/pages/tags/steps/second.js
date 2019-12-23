import React, {useState} from 'react'
import {Upload, Icon, message} from 'antd'
import {connect} from 'dva'
import Preview from './preview'
const {Dragger} = Upload
function Second(props) {
  const [fileList, setFileList] = useState([])
  const options = {
    name: 'file',
    showUploadList: {
      showRemoveIcon: false,
      showDownloadIcon: false,
      showPreviewIcon: true
    },
    multiple: true,
    action: '/api/file/temporaryFileUpload',
    beforeUpload(file, fileList) {
      return true
    },
    onChange(info) {
      const {status} = info.file;
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });
      setFileList(fileList)
      if (status !== 'uploading') {
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    onPreview(file) {
      console.log(file, 'preview')
      if (file && file.response) {
        props.openPreview({
          url: file.response.data.file.name,
          id: file.response.data.file._id
        })
      }
    },
    fileList: fileList
  }
  const handlePreviewOk = () => {
    props.closePreview()
  }
  return (
    <div>
      <Preview handleOk={handlePreviewOk}></Preview>
      <Dragger {...options}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{"点击或拖拽文件到此处上传"}</p>
        <p className="ant-upload-hint">{"可选择一个或多个文件上传"}</p>
      </Dragger>
    </div>
  )
}

export default connect((state) => ({
  ...state.process
}), null)(Second)