import React from 'react'
import {Steps} from 'antd';

const {Step} = Steps;


export default function Process() {
  return (
    <div>
      <h1>发起审核流程</h1>
      <Steps current={1}>
        <Step title="发起审核" description="This is a description." />
        <Step title="审核中" subTitle="Left 00:00:08" description="This is a description." />
        <Step title="审核完成" description="This is a description." />
      </Steps>,
    </div>
  )
}