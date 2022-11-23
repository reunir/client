import './assets/styles/index.css';
import { useAuth } from './context/auth-context'
import { Route, Navigate, Routes } from 'react-router-dom'
import { setAxiosDefault, setToken } from './axiosDefault'
import useUIMode from './hooks/setMode'
import React, { useEffect } from 'react'
import Loading from './components/Loading'
import Landing from './pages/Landing';
import NotFound from './pages/404';

const Signup = React.lazy(() => import('./pages/Signup'));
const Meet = React.lazy(() => import('./pages/Meet'));
const HomeMeet = React.lazy(() => import('./pages/HomeMeet'));
const Login = React.lazy(() => import('./pages/Login'))
const Redirect = React.lazy(() => import('./pages/Redirect'))
const Home = React.lazy(() => import('./pages/Home'))

function App() {
  const { user } = useAuth();
  const {mode,setModeByUser} = useUIMode();
  setAxiosDefault()
  if (user?.token) setToken(user.token)
  return (
    <React.Suspense
      fallback={
        <div><Loading /></div>
      }
    >
      {/* {!user?
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='*' element={<Redirect/>}/>
      </Routes>
      : */}
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/h' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/meet' element={<HomeMeet/>}/>
        <Route path='/meet/:id' element={<Meet/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* } */}
    </React.Suspense>
  );
}

export default App;
