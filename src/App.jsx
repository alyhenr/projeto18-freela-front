import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from './components/hoc/Wrapper';
import AnimatePage from './components/hoc/AnimatePage';

import AuthProvider from './context/AuthProvider';

import LandingPage from './pages/LandingPage';
import NavBar from './components/NavBar';

//Not-authenticated
import Authentication from './pages/Authentication';
import Explore from './pages/Explore';
import Users from './pages/Users';

//Authenticated Routes
import Protected from './components/hoc/Protected'; //Protected routes
import DashBoard from './pages/DashBoard';
import AddService from './pages/AddService';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Wrapper>
          <Route path='/'
            element={<AnimatePage><LandingPage /></AnimatePage>} />
          <Route path='/auth'
            element={<AnimatePage><Authentication /></AnimatePage>} />
          <Route path='/catalog'
            element={<AnimatePage><Explore /></AnimatePage>} />
          <Route path='/users'
            element={<AnimatePage><Users /></AnimatePage>} />

          {/* Protected Routes*/}
          <Route path='/dashboard'
            element={<AnimatePage><Protected>
              <DashBoard />
            </Protected></AnimatePage>} />
          <Route path='/new-service'
            element={<AnimatePage><Protected>
              <AddService />
            </Protected></AnimatePage>} />
        </Wrapper>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
