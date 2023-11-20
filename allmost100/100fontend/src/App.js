import { Route, Routes } from "react-router-dom";
import Home from "./home_page";
import AdminLogin from "./Scences/login/AdminLogin";
import UserLogin from "./Scences/login/UserLogin";
import Form from "./Scences/form";
import FormDashboard from "./Scences/admin_view";
import MySidebar from "./global";
import "./index.css";
import TicketDashboard from "./Scences/user_view";
import CreateTicket from "./Scences/admin_view/CreateTicket";
import Ticket from "./Scences/user_view/Ticket";

function App() {
  return (
    <div className="app">
      <MySidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/user" element={<UserLogin />}></Route>
          <Route path="/admin/newsubjects" element={<FormDashboard />}></Route>
          <Route path="/ticket/dashboard" element={<TicketDashboard/> }></Route>
          <Route path="/admin/CreateTicket" element={<CreateTicket/> }></Route>
          <Route path="/ticket/dashboard/ticket/:id" element={<Ticket/> }></Route>
        </Routes>
      </main>
    </div>
  );
}


export default App;
