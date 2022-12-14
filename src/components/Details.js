import { Avatar, AvatarColorScheme, AvatarShape, AvatarSize, List, Loader, LoaderType, ObjectPage, ObjectPageSection, StandardListItem } from '@ui5/webcomponents-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import DetailHeaderContent from './DetailHeaderContent';
import DetailHeaderTitle from './DetailHeaderTitle';

import "@ui5/webcomponents-icons/dist/AllIcons.js"

import {getShipmentData,getStopsData} from "../utils/data.js"
import StopsRow from './StopsRow';

function Details() {
  const { shipmentid } = useParams();
  const [isFetchingData,setIsFetchingData] = useState(true);
  const [shipmentData,setShipmentData] = useState();
  useEffect(()=>{
    getShipmentData(shipmentid).then((d)=>{
      console.log(d);
      setShipmentData(d);
      setIsFetchingData(false)
    });
  },[shipmentid])
  console.log(shipmentid);
  return (
    <>
    { isFetchingData ? <Loader type={LoaderType.Indeterminate} progress={"60%"}/> : 
      <ObjectPage        
              headerContent={<DetailHeaderContent headerData={shipmentData.shipmentHeader[0]}/>}
              headerContentPinnable
              headerTitle={<DetailHeaderTitle titleData={shipmentData.shipmentHeader[0]}/>}
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
                  {
                    shipmentData.shipmentStops.map((stop)=>{
                      return <StopsRow data={stop}/>
                    })
                  }
                </List>
              </ObjectPageSection>
      </ObjectPage>
    } 
    </>
  )
}

export default Details