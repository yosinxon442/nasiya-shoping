import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/layout";
import CustomerDetail from "../components/CustomerDetail";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Customers from "../pages/Customers";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import PersonalInfo from "../pages/settings/PersonalInfo";
import Help from "../pages/settings/Help";
import Feedback from "../pages/settings/Feedback";
import About from "../pages/settings/About";
import DebtDetail from "../components/DebtsDetail/DebtDetail";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/customer/:id" element={<CustomerDetail />} />
          <Route path="/debt/:debtId" element={<DebtDetail />} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/settings/personal-info" element={<PersonalInfo />} />
          <Route path="/settings/help" element={<Help />} />
          <Route path="/settings/feedback" element={<Feedback />} />
          <Route path="/settings/about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
