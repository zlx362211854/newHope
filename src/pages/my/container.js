import React from 'react'
import styles from './index.less'
import {useDrop} from 'react-dnd'
export default function Container(props) {
  const [{canDrop, isOver}, drop] = useDrop({
    accept: 'card',
    drop: () => ({type: props.name}),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  let backgroundColor = '#eff1f3'
  if (isActive) {
    backgroundColor = '#dadbdc'
  } else if (canDrop) {
    backgroundColor = '#eff1f3'
  }
  return (
    <div className={styles.container} ref={drop} style={{backgroundColor}}>
      <div className={styles.title}>{props.title}</div>
      <div>
        {props.children}
      </div>
    </div>
  )
}