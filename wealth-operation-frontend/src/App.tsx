import { Routes,Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./user/Login";

function App() {

  return (
    <>
    {/* <h1> IN main page </h1> */}
    <Routes>
      <Route path="/home" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
      
    </>
  )
}

export default App;
