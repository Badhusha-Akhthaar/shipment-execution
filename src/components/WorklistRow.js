import { Label, TableCell, TableRow } from '@ui5/webcomponents-react'
import "@ui5/webcomponents-icons/dist/AllIcons.js"

import {formatDate} from "../utils/formatter"
import React from 'react'
import ObjectStatusWrapper from './ObjectStatusWrapper';
import { useNavigate } from 'react-router-dom';

function WorklistRow(props) {
  const navigate = useNavigate()
  const { data } = props;
  function handleRowClick(rowInfo){
    console.log(rowInfo);
    navigate(`/detail/${rowInfo.tor_id}`,{ state: rowInfo });
  }
  return (
    <>
      <TableRow style={{"cursor":"pointer"}} onClick={()=>{handleRowClick(data)}}>
        <TableCell><Label>{data.tor_id}</Label></TableCell>
        <TableCell><ObjectStatusWrapper status={data.execution}/></TableCell>
        <TableCell><Label>{data.src_locid}</Label></TableCell>
        <TableCell><Label>{formatDate(data.pickup_tstmp)}</Label></TableCell>
        <TableCell><Label>{data.des_name},{data.des_city}</Label></TableCell>
        <TableCell><Label>{formatDate(data.return_tstmp)}</Label></TableCell>
      </TableRow>
    </>
  )
}

export default WorklistRow