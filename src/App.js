import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationPage from './components/pages/registration-page/RegistrationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={null} />
          <Route path="/registration" element={<RegistrationPage/>} />
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
