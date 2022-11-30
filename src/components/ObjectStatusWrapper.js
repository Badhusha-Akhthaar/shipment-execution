import { Icon, ObjectStatus } from '@ui5/webcomponents-react'
import React from 'react'

import {formatExecutionStatus,formatExecutionIcon,formatExecutionState} from "../utils/formatter"
function ObjectStatusWrapper(props) {
    const {status} = props
  return (
    <ObjectStatus icon={<Icon name={formatExecutionIcon(status)}></Icon>} state={formatExecutionState(status)}>
        {
            formatExecutionStatus(status)
        }
    </ObjectStatus>
  )
}

export default ObjectStatusWrapper