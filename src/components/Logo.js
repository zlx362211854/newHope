import React from 'react'
import {Avatar} from 'antd'
function Logo(props) {
  return <Avatar size={props.size} icon='user' src={props.src} />
}
export default Logo