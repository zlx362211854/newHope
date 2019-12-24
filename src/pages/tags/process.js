import React, {useState} from 'react'
import {Steps, Button} from 'antd'
import {connect} from 'dva'

import styles from './process.less'
import First from './steps/first'
import Second from './steps/second'
import Third from './steps/third'
import {process} from 'request'
import router from 'umi/router';
require('../index.css')
const {Step} = Steps;
function Process(props) {
  const [current, setCurrent] = useState(0)
  const [params, setParams] = useState({
    first: {},
    second: {},
    third: {}
  })
  const stepsMap = [
    {
      title: '填写标签审核信息',
      content: <First params={params.first} />
    },
    {
      title: '上传文件',
      content: <Second params={params.second}/>
    },
    {
      title: '提交',
      content: <Third params={params}/>
    },
  ];
  const prev = () => {
    if (current === 1) {
      const fileList = props.saveFileList()
      setParams({
        ...params,
        second: {
          fileList
        }
      })
      setCurrent(current - 1) 
    } else {
      setCurrent(current - 1) 
    }
  }
  const next = () => {
    if (current === 0) {
      props.submit().then((values) => {
        setParams({
          ...params,
          first: values
        })
        setCurrent(current + 1)
      })
    } else if (current === 1) {
      const fileList = props.saveFileList()
      setParams({
        ...params,
        second: {
          fileList
        }
      })
      setCurrent(current + 1)
    }
  }
  const handleProcessSubmit = () => {
    const {first: {title, content}, second: {fileList = []}} = params;
    process.create({
      params: {
        title: title,
        content: content,
        files: fileList.map(i => i.response.data.file._id)
      }
    }).then(data => {
      if (data.code === 1000) {
        message.success('创建申请成功!');
        router.push('/tags/list')
      }
    })
  }
  return (
    <div>
      <h3>{"发起标签审核申请"}</h3>
      <Steps current={current}>
        {stepsMap.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={styles.content}>{stepsMap[current].content}</div>
      <div className={styles.btncontent}>
        {current !== 0 &&
          <Button type="default" style={{marginRight: '10px'}} onClick={prev}>{"上一步"}</Button>
        }
        {(current === 0 || current === 1) &&
          <Button type="primary" style={{marginRight: '10px'}} onClick={next}>{"下一步"}</Button>
        }
        {current === 2 &&
          <Button type="primary" onClick={handleProcessSubmit}>{"提交"}</Button>
        }
      </div>
    </div>
  )
}
export default connect(
  (state) => ({
    ...state.process
  }),
  {

})(Process)