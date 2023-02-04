import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/header';
import Login  from './pages/auth/Login';
import SingUp from './pages/auth/SignUp';
import Home from './pages/blog/home'
import Article from './pages/blog/article';
import CreatePost from './pages/blog/create-post'
import Profile from './pages/blog/profile';
import { useAuth } from './context/AuthContext';


const PublicRoutes = () => (
  <Routes>
      <Route path='/auth/signup' element={<SingUp/>} />
      <Route path='/auth/login' element={<Login/>} />
      <Route path='/*' element={<Login/>} />
  </Routes>
)

const PrivateRoutes = () => (
  <Routes>
    <Route path='/home' element={ <Home/> } />
    <Route path='/article/:id' element={ <Article/> } />
    <Route path='/post' element={ <CreatePost/> } />
    <Route path='/profile' element={ <Profile/> } />
    <Route path='/*' element={ <Home/> } />
  </Routes>
)


const App = () => {

  const { logged } = useAuth();

  return (
    <>
      { logged && (<Header/>) }
      { logged ? <PrivateRoutes/> : <PublicRoutes/> }
    </>
  )
}

export default App