import React, {useEffect, useState} from 'react'
import {Row, Col, Steps, Icon, Badge, Timeline} from 'antd'
import styles from './process.less'
import {process} from 'request'
import moment from 'moment'
import {stepsMap} from './list.info'
const {Step} = Steps;
function auditDetail(props) {
  const logsMap = {
    create: '创建',
    assign: '',
    accept: '受理',
    process: '开始处理',
    done: '处理完成',
    delete: '删除',
    modify: '修改',
  }
  const {match: {params}} = props
  const {id} = params
  const [detail, setDetail] = useState({})
  const [logs, setLogs] = useState([]) // 日志类型 【create: 创建，assign: 指派给某人，accept: 接收，process: 开始处理，done: 处理完成，delete: 删除, modify: 修改】
  const [hoverFileIndex, setHoverFileIndex] = useState()
  const {creator = {}, files = [], create_time, status, conductor = {}} = detail

  useEffect(() => {
    getDetail()
    getLogs()
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
  const getLogs = () => {
    process.getAuditLogs({
      params: {
        id
      }
    }).then(resp => {
      if (resp.code === 1000) {
        setLogs(resp.data)
      }
    })
  }
  const renderStatus = () => {
    return <Badge color={stepsMap[status].color} text={stepsMap[status].title} status={status} />
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
        <Row gutter={[0, 24]}>
          <Col span={2} className="font_color_title">{"受理人"}：</Col>
          <Col span={10} className="font_color_content">{conductor.name}</Col>
        </Row>
      </div>
      {status &&
        <Steps size="small" current={stepsMap[status].index}>
          <Step title="已提交" />
          <Step title="已受理" />
          <Step title="处理中" />
          {status !== 'reject' && <Step title="已完成" />}
          {status === 'reject' && <Step title="驳回" />}
        </Steps>
      }
      <div className={styles.detailBody}>
        <Row gutter={16}>
          <Col span={18}>
            <h2>{detail.title}</h2>
            <p>
              {detail.content}
            </p>
          </Col>
          <Col span={6}>
            {files.length > 0 && <h1>文件 <span className="font_color_link font_size_12 pointer_cursor" style={{margin: '0 10px'}}>全部下载</span></h1>}
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
        <br/>
        <Row gutter={16}>
          <Col span={8}>
            <Timeline>
              {logs.map((i, index) => {
                return (
                  <Timeline.Item key={index}>
                    <span style={{marginRight: '10px'}}>{moment(i.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                    <span>{i.user.name} {logsMap[i.type]} {i.content}</span>
                  </Timeline.Item>
                )
              })}
            </Timeline>
          </Col>
          <Col span={16}></Col>
        </Row>
      </div>
    </div>
  )
}
export default auditDetail