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
import OperationsDashboard from "./pages/OperationalDashboard";
import ComplianceDashboard from "./pages/ComplianceDashboard";
import MonitorDashboard from "./pages/MonitorDashboard";
import InvestorDetails from "./pages/InvestorDetails";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoutes allowedRoles={["Admin","Operations_manager","Compliance_officer","Monitor"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />  
        <Route path="/investors"
          element={
            <ProtectedRoutes allowedRoles={["Admin","Operations_manager"]}>
              <Investors />
            </ProtectedRoutes>
            }
        />
          <Route path="/investors/:id"
          element={
            <ProtectedRoutes allowedRoles={["Admin","Operations_manager"]}>
              <InvestorDetails/>
            </ProtectedRoutes>
              }
            />

        <Route path="/transactions"
          element={
            <ProtectedRoutes allowedRoles={["Admin","Operations_manager"]}>
              <Transactions />
            </ProtectedRoutes>
            }
        />

        <Route path="/equity"
          element={
            <ProtectedRoutes allowedRoles={["Admin","Operations_manager"]}>
              
              <Equity />
            </ProtectedRoutes>
           }
        />

        <Route path="/mutual-funds"
          element={
            <ProtectedRoutes allowedRoles={["Admin","Operations_manager"]}>
              <MutualFunds />
            </ProtectedRoutes>
           }
        />

        <Route path="/profile"
          element={ 
             <ProtectedRoutes allowedRoles={["Admin","Operations_manager","Compliance_officer","Monitor"]}>    
              <Profile />
            </ProtectedRoutes>
              }
        />

        <Route path="/monitoring"
          element={
             <ProtectedRoutes allowedRoles={["Admin","Monitor"]}>    
              <MonitoringDashboard />
            </ProtectedRoutes>
         }
        />

        {/* <Route
          path="/monitoring/system-health"
          element={
          <ProtectedRoutes
              allowedRoles={["Admin","Operations_manager"]}
            ><SystemHealth /></ProtectedRoutes>}
        /> */}
        <Route path="/audit"  element={
          <ProtectedRoutes allowedRoles={["Admin","Compliance_officer","Monitor"]}>    
              <AuditLogs/>
            </ProtectedRoutes>
          }/>
        <Route
          path="*"
          element={<NotFound />}
        />

          <Route path="/operations-dashboard"
            element={
               <OperationsDashboard/>
              }
              />
              {/* <ProtectedRoutes
                allowedRoles={["Operations_manager"]}
              >
               
              </ProtectedRoutes> */}

          <Route
            path="/compliance-dashboard"
            element={
              <ComplianceDashboard/>
              
            }
          />
          {/* <ProtectedRoutes
                allowedRoles={["Compliance_officer"]}
              >
              </ProtectedRoutes> */}

          <Route
            path="/monitor-dashboard"
            element={
              <MonitorDashboard/>
             /*  <ProtectedRoutes
                allowedRoles={["Monitor"]}>
              </ProtectedRoutes> */
            }
          />

      </Routes>

    </div>
  );
}

export default App;