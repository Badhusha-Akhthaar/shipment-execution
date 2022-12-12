import React, { useEffect, useState } from 'react'
import { initializeData } from '../utils/data.js'
import { DynamicPage, DynamicPageHeader, DynamicPageTitle,Label,IllustratedMessage } from '@ui5/webcomponents-react';


import CustomFilterBar from './CustomFilterBar'
import Worklist from './Worklist.js';
import Loader from './Loader.js';
import InfoMessage from './InfoMessage.js';

function Main() {
    const [isFetching,setIsFetching] = useState(true);
    const [hasError,setHasError] = useState(false)
    useEffect(()=>{
      initializeData()
              .then((x)=>{
                  setIsFetching(false)
              })
              .catch((err)=>{
                setIsFetching(false)
                setHasError(true)
              });
    },[])
  return (
    <>
    <InfoMessage visible={hasError} title="Unable to initialze data" subtitle="Check your internet connection."/>
    <Loader message="Initializing Data..." visible={isFetching}>
      <IllustratedMessage titleText="Initializing the data for offline use" subtitleText="Please wait...."/>
    </Loader>
    <DynamicPage
        hidden={isFetching || hasError}
        headerContent={<DynamicPageHeader><CustomFilterBar/></DynamicPageHeader>}
        headerTitle={<DynamicPageTitle header={<Label>Shipments</Label>}/>}>
                <Worklist isFetching={isFetching}/>
    </DynamicPage>
    </>
    
  )
}

export default Main