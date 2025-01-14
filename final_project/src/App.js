import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
 import Register from "./pages/account/Register";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Login from "./pages/account/Login";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";
import Profile from "./pages/homepage/Profile";
import CarListing from "./pages/homepage/CarListing";
import About from "./pages/homepage/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUpdate from "./pages/admin/AdminUpdate";
import UserRoutes from "./protected_routes/UserRoutes";
import AdminRoutes from "./protected_routes/AdminRoutes";
import CarDetails from "./pages/homepage/CarDetails";
import AdminPage from "./pages/admin/Admin";
import Contact from "./pages/homepage/Contact";
import SearchResults from "./components/SearchResults";
import ShowReservation from "./pages/ui/ShowReservation";
import Success from "./pages/payments/Sucess";
import Failure from "./pages/payments/Failure";



function App() {

  return (

    <Router>
      <Navbar/>
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/login'element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/verify-otp" element={<VerifyOtp/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />

        <Route path="/cars" element={<CarListing/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/product/:id" element={<CarDetails/>} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route element={<UserRoutes/>}>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path="/reservations/:id" element={<ShowReservation />} />
          
        </Route>

         {/* Admin Routes */}
         <Route element={<AdminRoutes/>}>
         <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
            <Route path='/admin/update/:id' element={<AdminUpdate/>} />
        </Route>

      </Routes>
    

    </Router>

  );

}

export default App;