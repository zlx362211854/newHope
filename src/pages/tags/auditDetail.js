import React, {useEffect, useState} from 'react'
import {Row, Col, Steps, Icon} from 'antd'
import styles from './process.less'
import {process} from 'request'
import moment from 'moment'
const {Step} = Steps;
function auditDetail(props) {
  const {match: {params}} = props
  const {id} = params
  const [detail, setDetail] = useState({})
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
  const {creator = {}, files = {}, create_time} = detail
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
          <Col span={10} className="font_color_content">华西</Col>
          <Col span={2} className="font_color_title">{"状态"}：</Col>
          <Col span={10} className="font_color_content">submit</Col>
        </Row>
      </div>
      <Steps size="small" current={1}>
        <Step title="Finished" />
        <Step title="In Progress" />
        <Step title="Waiting" />
      </Steps>
      <div className={styles.detailBody}>
        <Row>
          <Col span={18}>
            <h2>dsfsf但是粉丝能更快</h2>
            <pre>
              asdadaslmkk
            </pre>
          </Col>
          <Col span={6}>
            <h1>文件</h1>
            <ul>
              <li>fdsfsd <Icon type="download" /></li>
              <li>gfdgwqeqw <Icon type="cloud-download" /></li>
              <li>ghfg <Icon type="cloud-download" /></li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default auditDetail