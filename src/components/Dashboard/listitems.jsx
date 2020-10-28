import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Dashboard from './Dashboard'

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
  <div>
    <ListItem
      button
      key="Dashboard"
      component={NavLink} to="/dashboard"
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Calendar" />
    </ListItem>
    <ListItem
      button
      key="Dashboard"
      component={NavLink} to="/clients"
    >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Clients" />
    </ListItem>
    <ListItem
      button
      key="Dashboard"
      component={NavLink} to="/chart"
    >
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Statistics" />
    </ListItem>
    <ListItem
      button
      key="Dashboard"
      component={NavLink} to="/todos"
    >
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Notes" />
    </ListItem>
  </div>
);


