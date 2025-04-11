import { lazy } from 'react';
const Login = lazy(() => import('@/pages/auth/login/login'))
const Home = lazy(() => import('@/pages/public/home/home'))
const Dashboard = lazy(() => import('@/pages/private/dashboard/dashboard'))
const Courses = lazy(() => import('@/pages/private/courses/courses'))
const CourseDetail = lazy(() => import('@/pages/private/courses/details/CourseDetail'))
const CoursesCreate = lazy(() => import('@/pages/private/courses/add-course/add-course'))
const GradeLevelPage = lazy(() => import('@/pages/private/grade-levels/grade-level'))
const Users = lazy(() => import('@/pages/private/users/users'))
const AddUser = lazy(() => import('@/pages/private/users/add-user'))
const EditUser = lazy(() => import('@/pages/private/users/edit-user'))

export const authRoutes = [
    { path: '/login', element: Login },
]

export const publicRoutes = [
    { path: '/', element: Home}
]

export const privateRoutes = [
    { path: '/dashboard', element: Dashboard },
    { path: '/courses', element: Courses },
    { path: '/courses/:courseId', element: CourseDetail },
    { path: '/courses/create', element: CoursesCreate },
    { path: '/users', element: Users },
    { path: '/users/create', element: AddUser },
    { path: '/users/edit/:id', element: EditUser },
    { path: '/grade-levels', element: GradeLevelPage }
]