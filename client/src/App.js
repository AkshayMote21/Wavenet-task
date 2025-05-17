
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import InvoiceDashboard from './components/InvoiceDashboard';
import UserDashboard from './components/UserDashboard';
import { useContext, useState } from 'react';
import Api from './axiosConfig';
import { AuthContext } from './context/auth.context';
import toast from 'react-hot-toast';

function App() {

  const { state, dispatch } = useContext(AuthContext);
  const router = useNavigate();
    async function handleLogout() {
      try {
        console.log("nigga at logout");
        const response = await Api.post("/auth/logout");
        if (response.data.success) {
          dispatch({ type: "LOGOUT" });
          router("/login");
          toast.success(response.data.message);
        } else {
          toast.error("Logout failed.");
        }
      }catch(error){
        toast.error("Failed to logout.");
      }
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/invoices" element={ state ? <InvoiceDashboard onLogout={handleLogout} /> : "Page Not Found!"} />
        <Route path="/users" element={state ? <UserDashboard  onLogout={handleLogout} /> : "Page Not Found!!"} />
        <Route path="/" element={<LoginPage/>} /> 
      </Routes>
    </div>
  );
}

export default App;
