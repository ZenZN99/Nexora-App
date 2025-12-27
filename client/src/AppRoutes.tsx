import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import User from "./pages/User";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/terms" element={<Terms />}/>
        <Route path="/support" element={<Support />}/>
        <Route path="/policy" element={<PrivacyPolicy />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/user/:id" element={<User />}/>
      </Routes>
    </div>
  );
};

export default AppRoutes;
