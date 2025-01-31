import Dashboard from "./dashboard/dashboard";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Login } from "./auth/login/login";
import Layout from "./layout/layout";
import Courses from "./courses/courses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        
      </Routes>

    </Router>
  )
}

export default App
