import Dashboard from "./private/dashboard/dashboard";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "./auth/login/login";
import Courses from "./private/courses/courses";
import Users from "./private/users/users";
import { useAuth } from "./core/contexts/AuthProvider";
import AddUser from "./private/users/add-user/add-user";
import { Suspense } from "react";
import Home from "./public/home/home";

function App() {
  const { isAuthenticated } = useAuth()
  return (
    <Suspense fallback={<>cargando...</>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to={'/login'} />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<AddUser />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={'/dashboard'} />}></Route>
          <Route path="*" element={<>NOT FOUND</>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
