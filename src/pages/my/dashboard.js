import React, {useState, useEffect} from 'react'
import {Row, Col} from 'antd'
import Card from './comps/card'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Container from './container'
import {process} from 'request'
import {connect} from 'dva'

function Dashboard(props) {
  const [data, setData] = useState([])
  useEffect(() => {
    getList()
    props.dispatch({
      type: 'process/updateState',
      payload: {
        getList
      },
    })
  }, [])
  const getList = () => {
    process.myList({}).then(resp => {
      if (resp.code === 1000) {
        console.log(resp.data, 'data--')
        setData(resp.data)
      }
    })
  }
  return (
    <div style={{height: "100%", padding: '20px 0'}}>
      <h1>工作台</h1>
      <DndProvider backend={Backend}>
        <Row gutter={30} style={{height: "100%"}}>
          <Col span={8} style={{height: "100%"}}>
            <Container title="待办" name='accepted' setData={setData}>
              {data.filter(i => i.status === 'accepted').map((i, index) => <Card key={index} {...i} />)}
            </Container>
          </Col>
          <Col span={8} style={{height: "100%"}}>
            <Container title="处理中" name="processing">
              {data.filter(i => i.status === 'processing').map((i, index) => <Card key={index} {...i} />)}
            </Container>
          </Col>
          <Col span={8} style={{height: "100%"}}>
            <Container title="完成" name="done">
              {data.filter(i => i.status === 'done').map((i, index) => <Card key={index} {...i} />)}
            </Container>
          </Col>
        </Row>
      </DndProvider>

    </div>
  )
}
export default connect((state) => ({
  ...state.process
}), null)(Dashboard)