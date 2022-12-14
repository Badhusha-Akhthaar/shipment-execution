import { Label,Table,TableColumn,TableGrowingMode } from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import WorklistRow from "./WorklistRow"

import { getShipmentsData } from '../utils/data.js'

function Worklist(props) {
  const [shipments, setShipments] = useState([]);
  useEffect(() => {
    console.log("Fetching data from PDB")
    getShipmentsData().then((data)=>{
      setShipments(data);
    })
  }, [props.isFetching]);
  return (
    <Table
      columns={
        <>
        <TableColumn style={{ width: "12rem" }}>
            <Label>Shipment Number</Label>
          </TableColumn>
          <TableColumn minWidth={600} popinText="Execution">
            <Label>Execution</Label>
          </TableColumn>
          <TableColumn demandPopin minWidth={600} popinText="Source Location">
            <Label>Source Location</Label>
          </TableColumn>
          <TableColumn demandPopin minWidth={600} popinText="Pickup Date">
            <Label>Pickup Date</Label>
          </TableColumn>
          <TableColumn
            demandPopin
            minWidth={600}
            popinText="Destination Location"
          >
            <Label>Destination Location</Label>
          </TableColumn>
          <TableColumn demandPopin minWidth={600} popinText="Return Date">
            <Label>Return Date</Label>
          </TableColumn>
        </>
      }
      growing={TableGrowingMode.Scroll}>
        {
            shipments.map((shipment)=>{
                return <WorklistRow data={shipment}/>
            })
        }
      </Table>
  );
}

export default Worklist;
