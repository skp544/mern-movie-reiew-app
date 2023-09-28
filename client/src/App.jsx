import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import {
  ConfirmPassword,
  EmailVerification,
  ForgetPassword,
  Home,
  NotFound,
  SignIn,
  SignUp,
} from "./pages";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
