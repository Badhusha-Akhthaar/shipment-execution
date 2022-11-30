import React from "react";

import "@ui5/webcomponents-fiori/dist/illustrations/ErrorScreen";
import {
  IllustratedMessage,
  IllustrationMessageType,
} from "@ui5/webcomponents-react";

function InfoMessage(props) {
  const { visible,title,subtitle } = props;
  if (!visible) return null;
  return <IllustratedMessage name={IllustrationMessageType.ErrorScreen} titleText={title} subtitleText={subtitle}/>;
}

export default InfoMessage;
