import React, { useEffect } from "react";
import "./App.css";
import { ShellBar } from "@ui5/webcomponents-react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";

import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme';
import '@ui5/webcomponents-react/dist/Assets';

function App() {
  useEffect(()=>{
    setTheme('sap_horizon');
  },[])
  return (
    <>
      <ShellBar primaryTitle="Shipment Execution App"></ShellBar>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="detail" element={<Details/>}/>
      </Routes>
    </>
  );
}

export default App;
