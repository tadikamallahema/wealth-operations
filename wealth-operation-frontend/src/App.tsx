/* import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Investors from "./pages/Investors";
import Transactions from "./pages/Transactions";
import SIP from "./pages/SIP";
import Equity from "./pages/Equity";
import MutualFunds from "./pages/MutualFunds";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./context/ProtectedRoutes";


function App() {

  return (
    <>
    {/* <h1> IN main page </h1> 
    <div>

    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='/investors' element={<Investors />} />
      <Route path='/transactions' element={<Transactions />} />
      
      <Route path='/equity' element={<Equity />} />
      <Route path='/mutual-funds' element={<MutualFunds/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='*' element={<NotFound/>} />
      
      <Route path='/dashboard' element={
        <ProtectedRoutes allowedRoles={["Admin"]}><Dashboard />
        </ProtectedRoutes> }/>
      
    </Routes>
    </div>
      
    </>
  )
}

export default App;
 */
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Investors from "./pages/Investors";
import Transactions from "./pages/Transactions";
import Equity from "./pages/Equity";
import MutualFunds from "./pages/MutualFunds";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import socket from "./socket/socket";
import ProtectedRoutes from "./context/ProtectedRoutes";

import MonitoringDashboard from "./pages/monitoring/MonitoringDashboard";
import SystemHealth from "./pages/monitoring/SystemHealth";
import AuditLogs from "./pages/monitoring/AuditLogs";
function App() {

  return (

    <div>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        
        <Route
          path="/investors"
          element=
          {
            <Investors />
            }
        />

        <Route
          path="/transactions"
          element={
            <Transactions />
            }
        />

        <Route
          path="/equity"
          element={
            <Equity />
           }
        />

        <Route
          path="/mutual-funds"
          element={
            <MutualFunds />
           }
        />

        <Route
          path="/profile"
          element={ 
            <Profile />
              }
        />

        <Route
          path="/monitoring"
          element={
            <MonitoringDashboard />
         }
        />

        {/* <Route
          path="/monitoring/system-health"
          element={
          <ProtectedRoutes
              allowedRoles={["Admin","Operations_manager"]}
            ><SystemHealth /></ProtectedRoutes>}
        /> */}

        <Route path="/audit"  element={<AuditLogs/>}/>
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </div>
  );
}

export default App;