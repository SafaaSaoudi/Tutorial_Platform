import UserTutorials from './Components/UserTutorials';
import Tutorials from './Components/Tutorials';
import { Route, Routes } from 'react-router-dom';
import Hello from './Components/Hello';
import Admin from './Components/Admin';
import LoginForm from './Components/LoginForm';
import Tuto from './Components/Tuto';
import SignUp from "./Components/User/SignUp";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Tutorials />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/usertest" element={<Hello />} />
        <Route path="/admintest" element={<Admin />} />
        <Route path="/UserTutorials/:_id" element={<UserTutorials />} />
        <Route path="/Tutorials" element={<Tutorials />} />
        <Route path="/Tuto/:_id" element={<Tuto />} />
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}

export default App
