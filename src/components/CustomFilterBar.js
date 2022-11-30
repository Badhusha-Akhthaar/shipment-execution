import { FilterBar,Input,Title,FilterGroupItem } from '@ui5/webcomponents-react';
import React from 'react'

function CustomFilterBar() {
  return (
    <FilterBar header={<Title>Test</Title>} hideToolbar>
      <FilterGroupItem label="Shipment No." style={{maxWidth: '15rem'}} required>
        <Input placeholder='Shipment / Freight Order Number' required/>
      </FilterGroupItem>
    </FilterBar>
  )
}

export default CustomFilterBar