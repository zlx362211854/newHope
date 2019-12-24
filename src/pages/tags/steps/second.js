import React, {useState, useEffect} from 'react'
import {Upload, Icon, message} from 'antd'
import {connect} from 'dva'
import Preview from './preview'
import router from 'umi/router';
const {Dragger} = Upload
function Second(props) {
  const {dispatch} = props;
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    saveFileList
    dispatch({
      type: 'process/updateState',
      payload: {
        saveFileList
      },
    });
  }, [fileList])
  useEffect(() => {
    const {fileList} = props.params
    setFileList(fileList)
  }, [props.params])
  const saveFileList = () => {
    return fileList
  }
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
          file.url = file.response.url;
        }
        return file;
      });
      setFileList(fileList)
      if (status !== 'uploading') {
      }
      if (status === 'done') {
        if (info.file.response.code === 3000) {
          if (info.file.response.redirect) {
            router.push(info.file.response.redirect)
          }
        } else if (info.file.response.code === 1000) {
          message.success(`${info.file.name} 文件上传成功.`);
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    onPreview(file) {
      if (file && file.response && file.type.split('/')[0] === 'image') {
        props.openPreview({
          url: file.response.data.file.name,
          id: file.response.data.file._id,
          type: file.type
        })
      }
    },
    fileList: fileList
  }
  const handleChangeFileList = (file, prevId) => {
    const newFileList = fileList.map(i => {
      if (i.response.data.file._id === prevId) {
        const obj = i
        obj.response.data.file = {
          ...obj.response.data.file,
          _id: file.data._id,
          name: file.data.name,
          create_time: file.data.create_time,
        }
        return obj
      }
      return i
    })
    setFileList(newFileList)
  }
  const handlePreviewOk = () => {
    props.closePreview()
  }
  return (
    <div>
      <Preview handleOk={handlePreviewOk} handleChangeFileList={handleChangeFileList}></Preview>
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