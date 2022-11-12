import CreateRecord from '../pages/CreateRecord';
import EditRecord from '../pages/EditRecord';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Record from '../pages/Record';

export const publicRoute = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/record',
    component: Record,
    exact: true,
  },
  {
    path: '/record/new',
    component: CreateRecord,
    exact: true,
  },
  {
    path: '/record/:id',
    component: EditRecord,
    exact: true,
  },
];
