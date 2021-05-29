import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState({
    username: "",
    userId: null
  });

  useEffect(() => {
    if (Cookies) {
      setState({
        ...state,
        username: Cookies.get('username'),
        userId: Cookies.get('userId')
      })
    }
  }, [state])

  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
