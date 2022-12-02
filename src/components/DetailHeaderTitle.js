import { DynamicPageTitle,Button, Breadcrumbs, BreadcrumbsItem, BreadcrumbsSeparatorStyle } from '@ui5/webcomponents-react'
import React from 'react'
import ObjectStatusWrapper from './ObjectStatusWrapper';

function DetailHeaderTitle(props) {
    const {titleData} = props;
  return (
    <>
        <DynamicPageTitle
            actions={<><Button design="Emphasized">Navigate</Button><Button>Report Event</Button></>}
            breadcrumbs={<><Breadcrumbs separatorStyle={BreadcrumbsSeparatorStyle.GreaterThan}><BreadcrumbsItem href='/'>All Shipments</BreadcrumbsItem><BreadcrumbsItem>{titleData.tor_id}</BreadcrumbsItem></Breadcrumbs></>}
            header={titleData.tor_id}
            showSubHeaderRight
            subHeader={<ObjectStatusWrapper status={titleData.execution}/>}
            />
    </>
  )
}

export default DetailHeaderTitle