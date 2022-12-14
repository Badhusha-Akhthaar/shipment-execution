import { StandardListItem } from '@ui5/webcomponents-react'
import React from 'react'

function StopsRow(props) {
    const {des_name,des_city,status,des_locid} = props.data
  return (
    <StandardListItem icon="map-fill" description={`${des_name} - ${des_city}`} additionalText={status} additionalTextState="Information">{des_locid}</StandardListItem>
  )
}

export default StopsRow