import { BaseLayout } from '@/core/layout/base-layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { authRoutes, privateRoutes, publicRoutes } from './routes'
import { Suspense } from 'react'
import ProtectedRoute from './protected.route'
import Layout from '@/core/layout/layout'
import AuthRoute from './auth.route'
import ClipLoader from "react-spinners/ClipLoader";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={
                <div className='w-100 vh-100 flex items-center justify-center'>
                    <ClipLoader
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                }>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<BaseLayout />}>
                        {publicRoutes.map((route) => (
                            <Route key={route.path} path={route.path} element={<route.element />} />
                        ))}
                    </Route>

                    <Route element={<AuthRoute />}>
                        {authRoutes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={<route.element />}
                            />
                        ))}
                    </Route>

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            {privateRoutes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<route.element />}
                                />
                            ))}
                        </Route>
                    </Route>

                    <Route path="*" element={<>NOT FOUND</>} />
                </Routes>
            </Suspense>

        </BrowserRouter>
    )
}

export default AppRoutes