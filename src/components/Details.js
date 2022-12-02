import { Avatar, AvatarColorScheme, AvatarShape, AvatarSize, ObjectPage } from '@ui5/webcomponents-react';
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import DetailHeaderContent from './DetailHeaderContent';
import DetailHeaderTitle from './DetailHeaderTitle';

import "@ui5/webcomponents-icons/dist/AllIcons.js"

import truck from "../truck.png"

function Details() {
  const { shipmentid } = useParams();
  const shipmentData = useLocation();
  console.log(shipmentData);
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
      </ObjectPage>
    </>
  )
}

export default Details