import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LkPage from './components/pages/lk-page/LkPage';
import LoginPage from './components/pages/login-page/LoginPage';
import RegistrationPage from './components/pages/registration-page/RegistrationPage';
import Test from './components/Test';
import { LK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ROOT_ROUTE } from './const/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={ROOT_ROUTE} exact element={null} />
          <Route path={REGISTRATION_ROUTE} exact element={<RegistrationPage/>} />
          <Route path={LOGIN_ROUTE} exact element={<LoginPage/>} />
          <Route path={LK_ROUTE} exact element={<LkPage/>} />
          <Route path="/test" exact element={<Test/>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
{/* <Router>
<div className="App">
  Hello, world!S
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/about" component={App} />
  </Switch>
  <Link to="/about">About</Link>
</div>
</Router> */}
