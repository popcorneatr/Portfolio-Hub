import './styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/page/Home.jsx"
import AddNewProject from "./page/AddNewProject.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/add-new-project" element={<AddNewProject />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
