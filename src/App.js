import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";

function App() {
  const [state, setState] = useState({
    username: "",
    userId: null
  });
  const [cookies, setCookie] = useCookies([]);

  useEffect(() => {
    if (cookies.userInfo) {
      setState(state => ({
        ...state,
        username: cookies.userInfo.username,
        userId: cookies.userInfo.userId
      }))
    }
  }, [cookies])

  return (
    <main>
      <BrowserRouter>
        <Navbar state={state}/>
        <Switch>
          <Route path="/login" component={() => <Login state={state} setState={setState} setCookie={setCookie}/>}></Route>
          <Route path="/dashboard" component={() => <Dashboard state={state}/>}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
