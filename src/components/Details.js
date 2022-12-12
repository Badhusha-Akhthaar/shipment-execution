import { Avatar, AvatarColorScheme, AvatarShape, AvatarSize, List, ObjectPage, ObjectPageSection, StandardListItem } from '@ui5/webcomponents-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import DetailHeaderContent from './DetailHeaderContent';
import DetailHeaderTitle from './DetailHeaderTitle';

import "@ui5/webcomponents-icons/dist/AllIcons.js"

import {getShipmentData} from "../utils/data.js"

function Details() {
  const { shipmentid } = useParams();
  const shipmentData = useLocation();
  const [stops,setStops] = useState();
  useEffect(()=>{
    getShipmentData(shipmentid)
      .then((data)=>{setStops(data)});
  },[shipmentid])
  console.log(shipmentData);
  console.log(shipmentid);
  return (
    <>
    <ObjectPage        
            headerContent={<DetailHeaderContent headerData={shipmentData.state}/>}
            headerContentPinnable
            headerTitle={<DetailHeaderTitle titleData={shipmentData.state}/>}
            image={<><Avatar icon="product" size={AvatarSize.M} colorScheme={AvatarColorScheme.Accent9} shape={AvatarShape.Square}></Avatar></>}
            imageShapeCircle
            onSelectedSectionChange={function noRefCheck(){}}
            onToggleHeaderContent={function noRefCheck(){}}
            showHideHeaderButton
            alwaysShowContentHeader
            style={{
              height: '700px'
            }}
          >
            <ObjectPageSection titleText='Stops' id='stops'>
              <List>
                
              </List>
            </ObjectPageSection>
      </ObjectPage>
    </>
  )
}

export default Details