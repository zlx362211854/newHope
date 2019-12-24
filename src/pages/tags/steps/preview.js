import React, {useState, useEffect, useRef} from 'react'
import {Modal} from 'antd'
import {connect} from 'dva'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import locale from './preview.locale'
import {file} from 'request';
function Preview(props) {
  const {dispatch} = props
  const [visible, trigger] = useState(false)
  const instance = useRef(null)
  const [url, setUrl] = useState('')
  const [temporaryFileId, setTemporaryFileId] = useState('')
  useEffect(() => {
    dispatch({
      type: 'process/updateState',
      payload: {
        openPreview: open,
        closePreview: close
      }
    })
  }, [url])
  const open = ({url, id}) => {
    if (url) {
      setUrl(url)
      setTemporaryFileId(id)
    }
    trigger(true)
  }
  const close = () => {
    trigger(false)
  }
  const theme = {
    // main icons
    'menu.normalIcon.path': '/api/icon-b.svg',
    'menu.normalIcon.name': 'icon-b',
    'menu.activeIcon.path': '/api/icon-a.svg',
    'menu.activeIcon.name': 'icon-a',
    'menu.iconSize.width': '24px',
    'menu.iconSize.height': '24px',

    // submenu icons
    'submenu.normalIcon.path': '/api/icon-a.svg',
    'submenu.normalIcon.name': 'icon-a',
    'submenu.activeIcon.path': '/api/icon-c.svg',
    'submenu.activeIcon.name': 'icon-c',
    'submenu.iconSize.width': '32px',
    'submenu.iconSize.height': '32px',
  };
  const handleOk = () => {
    if (instance) {
      const myImage = instance.current.imageEditorInst.toDataURL();
      file.uploadBase64({
        params: {
          id: temporaryFileId,
          base64: myImage
        }
      }).then(req => {
        props.handleChangeFileList(req, temporaryFileId)
      });
      props.handleOk()
    }
  }
  return (
    <Modal
      title="图片预览"
      visible={visible}
      width={1000}
      onOk={handleOk}
      onCancel={() => {trigger(false)}}
      destroyOnClose={true}
    >
      <ImageEditor
        ref={instance}
        includeUI={{
          loadImage: {
            path: '/api/' + url,
            name: 'SampleImage'
          },
          theme: theme,
          menu: ['crop', 'rotate', 'draw', 'text',
            // 'filter'
          ],
          // initMenu: 'filter',
          uiSize: {
            width: '950px',
            height: '600px'
          },
          menuBarPosition: 'right',
          locale: locale
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics={true}

      />
    </Modal>
  )
}
export default connect((state) => ({
  ...state.process
}), null)(Preview)