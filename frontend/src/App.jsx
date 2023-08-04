import UserTutorials from './Components/UserTutorials';
import Tutorials from './Components/Tutorials';
import { Route, Routes } from 'react-router-dom';
import Hello from './Components/Hello';
import Admin from './Components/Admin';
import LoginForm from './Components/LoginForm';
import Tuto from './Components/Tuto';
import SignUp from "./Components/User/SignUp";
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import ResetCode from './Components/ResetCode';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Tutorials />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reset-code" element={<ResetCode />} />
        <Route path="/reset-password/:code" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgetPassword/>} />
        <Route path="/Admin/:_id" element={<Admin />} />
        <Route path="/UserTutorials/:_id" element={<UserTutorials />} />
        <Route path="/Tutorials" element={<Tutorials />} />
        <Route path="/Tuto/:_id" element={<Tuto />} />
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}

export default App