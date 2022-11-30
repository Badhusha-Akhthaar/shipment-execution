import { Label, TableColumn } from '@ui5/webcomponents-react'
import React from 'react'

function WorklistColumns() {
  return (
    <>
    <TableColumn style={{width: '12rem'}}><Label>Product</Label></TableColumn><TableColumn minWidth={800} popinText="Supplier"><Label>Supplier</Label></TableColumn><TableColumn demandPopin minWidth={600} popinText="Dimensions"><Label>Dimensions</Label></TableColumn><TableColumn demandPopin minWidth={600} popinText="Weight"><Label>Weight</Label></TableColumn><TableColumn><Label>Price</Label></TableColumn>
    </>
    
  )
}

export default WorklistColumns