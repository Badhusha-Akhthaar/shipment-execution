import { DynamicPageTitle,Button, Breadcrumbs, BreadcrumbsItem, BreadcrumbsSeparatorStyle } from '@ui5/webcomponents-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ObjectStatusWrapper from './ObjectStatusWrapper';

function DetailHeaderTitle(props) {
    const {titleData} = props;
    const navigate = useNavigate();
  return (
    <>
        <DynamicPageTitle
            actions={<><Button design="Emphasized">Navigate</Button><Button>Report Event</Button></>}
            breadcrumbs={<><Breadcrumbs separatorStyle={BreadcrumbsSeparatorStyle.GreaterThan}><BreadcrumbsItem>All Shipments</BreadcrumbsItem><BreadcrumbsItem>{titleData.tor_id}</BreadcrumbsItem></Breadcrumbs></>}
            header={titleData.tor_id}
            showSubHeaderRight
            subHeader={<ObjectStatusWrapper status={titleData.execution}/>}
            />
    </>
  )
}

export default DetailHeaderTitle