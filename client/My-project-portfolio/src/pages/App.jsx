import './styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/page/Home.jsx"
import AddNewProject from "./page/AddNewProject.jsx";
import LandingPage from './page/LandingPage.jsx';
import SignUp from './page/SignUp.jsx';
import Login from './page/Login.jsx';
// import { AuthProvider } from '../context/AuthContext.jsx';

function App() {

  return (
    <BrowserRouter>
    {/* <AuthProvider> */}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path="/add-new-project" element={<AddNewProject />} />
      </Routes>
    {/* </AuthProvider> */}
    </BrowserRouter>
  )
}

export default App
