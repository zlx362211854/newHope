import React from 'react'
import {Icon, message} from 'antd'
import styles from './card.less'
import {useDrag} from 'react-dnd'
import {process} from 'request'
import {connect} from 'dva'
function Card(props) {
  const [{isDragging}, drag] = useDrag({
    item: {name: props._id, type: 'card', status: props.status},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      console.log(item, dropResult, 10)
      if (item && dropResult) {
        const {type} = dropResult
        if (type !== item.status) {
          const params = {
            id: item.name,
            type
          }
          process.update({
            params
          }).then(resp => {
            if (resp.code === 1000) {
              message.success('操作成功!')
              props.getList()
            }
          })
        }
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.4 : 1
  return (
    <div className={styles.card} ref={drag} style={{opacity}}>
      <div className={styles.head}>
        <div className={styles.title + ' font_color_title'}>{props.title}</div>
        <div className={styles.more}><Icon type="more" /></div>
      </div>
      <div className={styles.content + ' font_color_content'}>
        {props.content}
      </div>
      <div className={styles.foot}>
        <div className={styles.item}>
          <span className="font_color_title">创建人:</span>
          <span className="font_color_content">{props.creator.name}</span>
        </div>
        <div className={styles.item}>
          <span className="font_color_title">组织或公司:</span>
          <span className="font_color_content">{props.creator.org.name}</span>
        </div>
      </div>
    </div>
  )
}
export default connect(
  (state) => ({
    ...state.process
  }),
  {

})(Card)