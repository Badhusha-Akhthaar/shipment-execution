import { BusyIndicator } from "@ui5/webcomponents-react";

import "@ui5/webcomponents-fiori/dist/illustrations/BalloonSky.js";
import React from "react";
import ReactDOM from "react-dom";

function Loader(props) {
  let { message,visible,children } = props;
  if(!visible) return null;
  return ReactDOM.createPortal(
    <>
      {children}
      <BusyIndicator active style={{ display: "block" }} text={message}></BusyIndicator>
    </>,
    document.getElementById("busy-indicator")
  );
}

export default Loader;
