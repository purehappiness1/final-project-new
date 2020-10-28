import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './components/Dashboard/Dashboard';
import SignInSide from './components/SignIn/Signin';
import Register from './components/Register/Register';
import Mainpage from './components/MainPage/Mainpage';
import Clients from './components/Dashboard/Clients';
import Chart from './components/Dashboard/Chart'
import Todos from './components/Dashboard/Todos'

function App() {

  function PrivateRoute({child}) {
    const isAuth = useSelector((state) => state.isAuth);

    return (
      <Route
        render={() =>
          isAuth
            ? (child) 
            : (<Redirect to={{ pathname: '/homepage' }} />) 
        }
      />
    );
  }
  return (
    <div >
      <Router>
        <Switch>
          <Route path="/homepage">
            <Mainpage />
          </Route>
          <Route exact path='/' render={() => <Redirect to="/homepage" />} />
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/signin">
            <SignInSide />
          </Route>
          <PrivateRoute path='/dashboard' child={<Dashboard/>}>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path='/clients' child={<Clients />}
          >
            <Clients />
          </PrivateRoute>
          <PrivateRoute path='/chart' child={<Chart />}
          >
            <Chart />
          </PrivateRoute>
          <PrivateRoute path='/todos' child={<Todos />}
          >
            <Todos />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
