import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Investors from "./pages/Investors";
import Transactions from "./pages/Transactions";
import SIP from "./pages/SIP";
import Equity from "./pages/Equity";
import MutualFunds from "./pages/MutualFunds";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";


function App() {

  return (
    <>
    {/* <h1> IN main page </h1> */}
    <div>

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/investors' element={<Investors />} />
      <Route path='/transactions' element={<Transactions />} />
      <Route path='/sip' element={<SIP />} />
      <Route path='/equity' element={<Equity />} />
      <Route path='/mutual-funds' element={<MutualFunds/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    </div>
      
    </>
  )
}

export default App;
