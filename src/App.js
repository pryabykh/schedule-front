import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/pages/login-page/LoginPage';
import RegistrationPage from './components/pages/registration-page/RegistrationPage';
import Test from './components/Test';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={null} />
          <Route path="/registration" exact element={<RegistrationPage/>} />
          <Route path="/login" exact element={<LoginPage/>} />
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
