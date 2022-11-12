import { publicRoute } from '../constant/route';
import {
  BrowserRouter as Switch,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';
import PageNotFound from '../pages/PageNotFound';

const token = localStorage.getItem('accessToken');

const publicRoutes = publicRoute.map((p, index) => {
  const Component = p.component;
  return (
    <Route
      key={index}
      path={p.path}
      element={
        token || p.path === '/login' ? (
          <Component />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
});

const CustomerRoute = () => {
  return (
    <Switch>
      <Routes>
        {publicRoutes}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Switch>
  );
};

export default CustomerRoute;
