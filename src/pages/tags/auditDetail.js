import React, {useEffect, useState} from 'react'
import {Row, Col, Steps, Icon, Badge} from 'antd'
import styles from './process.less'
import {process} from 'request'
import moment from 'moment'
import {stepsMap} from './list.info'
const {Step} = Steps;
function auditDetail(props) {
  const {match: {params}} = props
  const {id} = params
  const [detail, setDetail] = useState({})
  const [hoverFileIndex, setHoverFileIndex] = useState()
  const {creator = {}, files = [], create_time, status} = detail

  useEffect(() => {
    getDetail()
  }, [id])
  const getDetail = () => {
    process.getAuditDetail({
      params: {
        id
      }
    }).then(resp => {
      if (resp.code === 1000) {
        setDetail(resp.data)
      }
    })
  }
  const renderStatus = () => {
    return <Badge color={stepsMap[status].color} text={stepsMap[status].title} />
  }
  return (
    <div>
      <h1>{"标签详情"}</h1>
      <div className={styles.detailHeader}>
        <Row gutter={[0, 24]}>
          <Col span={2} className="font_color_title">{"申请人"}：</Col>
          <Col span={10} className="font_color_content">{creator.name}</Col>
          <Col span={2} className="font_color_title">{"申请时间"}：</Col>
          <Col span={10} className="font_color_content">{moment(create_time).format('YYYY-MM-DD HH:mm:ss')}</Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col span={2} className="font_color_title">{"所属组织"}：</Col>
          <Col span={10} className="font_color_content">{creator.org && creator.org.name}</Col>
          <Col span={2} className="font_color_title">{"状态"}：</Col>
          <Col span={10} className="font_color_content">{status && renderStatus()}</Col>
        </Row>
      </div>
      {status &&
        <Steps size="small" current={stepsMap[status].index}>
          <Step title="已提交" />
          <Step title="已接收" />
          <Step title="处理中" />
          {status !== 'reject' && <Step title="已完成" />}
          {status === 'reject' && <Step title="驳回" />}
        </Steps>
      }
      <div className={styles.detailBody}>
        <Row>
          <Col span={18}>
            <h2>{detail.title}</h2>
            <pre>
              {detail.content}
            </pre>
          </Col>
          <Col span={6}>
            <h1>文件 <span className="font_color_link font_size_12" style={{margin: '0 10px'}}>全部下载</span></h1>
            <ul style={{borderLeft: '1px solid #d8d8d8', margin: '20px 0', cursor: 'pointer'}}>
              {files.map((file, index) => {
                return (
                  <li key={index} onMouseOver={() => {
                    setHoverFileIndex(index)
                  }}>
                    <span style={{marginRight: '10px', borderBottom: hoverFileIndex === index ? '1px solid #d8d8d8' : 'none'}}>{file.displayName}</span>
                    {hoverFileIndex === index && <Icon className="font_color_link" type="download" />}
                  </li>
                )
              })}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default auditDetail