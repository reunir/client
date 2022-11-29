import './assets/styles/index.css';
import { useAuth } from './context/auth-context'
import { Route, Navigate, Routes } from 'react-router-dom'
import { setAxiosDefault, setToken } from './axiosDefault'
import useUIMode from './hooks/setMode'
import React, { useEffect, useState } from 'react'
import Loading from './components/Loading'
import Landing from './pages/Landing';
import NotFound from './pages/404';
import MeetNav from './components/MeetNav';
import Me from './components/Me';
import axios from 'axios';
import { getUserAvatar, setUserAvatar } from './utils/generateAvatar';

const Signup = React.lazy(() => import('./pages/Signup'));
const Meet = React.lazy(() => import('./pages/Meet'));
const HomeMeet = React.lazy(() => import('./pages/HomeMeet'));
const Login = React.lazy(() => import('./pages/Login'))
const Redirect = React.lazy(() => import('./pages/Redirect'))
const Home = React.lazy(() => import('./pages/Home'))

function App() {
  const { user } = useAuth();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { mode, setModeByUser } = useUIMode();
  setAxiosDefault()
  if (user?.token) {
    setToken(user.token)
  }
  const getUser = async () => {
    const res = await axios.get('auth/me')
    if (res.data.status) {
      setMe(res.data.success.user)
      if (getUserAvatar() == "") {
        setLoading(true);
        setUserAvatar(res.data.success.user);
        setLoading(false);
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    if (user?.token) {
      getUser();
    }
  }, [user?.token])

  return (
    <React.Suspense
      fallback={
        <div><Loading /></div>
      }
    >
      {!user ?
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Redirect />} />
        </Routes>
        :
        loading ?
          <Loading />
          :
          <Routes>
            <Route element={<Me me={me} setMe={setMe} />}>
              <Route exact path='/' element={<Landing />} />
              <Route path='/h' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route element={<MeetNav />}>
                <Route path='/meet' element={<HomeMeet />} />
                <Route path='/meet/:id' element={<Meet />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
      }
    </React.Suspense>
  );
}

export default App;
