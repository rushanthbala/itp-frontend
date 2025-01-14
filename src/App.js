import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack"


import { AdminLayout, EmpLayout, UserLayout } from "./layouts"
import React from "react";
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("sessionStorage");

//Place Main routes here.
function App() {
  return (
    <SnackbarProvider>

    <Router>
      <Routes>

        {/*Please put the pages into the appropriate layouts. 
        Userlayout is for customers. 
      AdminLayout is for admins and vice versa*/}
        <Route path="/*" element={<UserLayout />} />
        <Route path="/employee/*" element={<EmpLayout />}></Route>
        <Route path="/admin/*" element={<AdminLayout />} ></Route>
      </Routes>
    </Router>
      </SnackbarProvider>
  );
}

export default App;
