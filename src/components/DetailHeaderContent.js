import {
  DynamicPageHeader,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxWrap,
  Label,
  Avatar,
  AvatarColorScheme,
  AvatarShape,
  AvatarSize,
} from "@ui5/webcomponents-react";
import React from "react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { formatDate } from "../utils/formatter";
function DetailHeaderContent(props) {
  const { headerData } = props;
  return (
    <>
      <DynamicPageHeader>
        <FlexBox alignItems={FlexBoxAlignItems.Center} wrap={FlexBoxWrap.Wrap}>
          <FlexBox direction={FlexBoxDirection.Column} style={{paddingLeft: '30px'}}>
            <Avatar
              icon="product"
              size={AvatarSize.M}
              colorScheme={AvatarColorScheme.Accent9}
              shape={AvatarShape.Square}
            ></Avatar>
          </FlexBox>
          <FlexBox direction={FlexBoxDirection.Column} style={{paddingLeft: '30px'}}>
            <Label>
              <b>Pickup Date : </b>
              {formatDate(headerData.pickup_tstmp)}
            </Label>
            <Label>
              <b>Return Date : </b>
              {formatDate(headerData.return_tstmp)}
            </Label>
          </FlexBox>
        </FlexBox>
      </DynamicPageHeader>
    </>
  );
}

export default DetailHeaderContent;
