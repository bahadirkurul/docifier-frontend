import NotFound from "./pages/NotFound";
import Account from "./pages/account/account";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import CreateDoc from "./pages/createDoc/CreateDoc";
import DocOverview from "./pages/docPage/docOverview";
import DocDetails from "./pages/docPage/docPage";
import DocSettings from "./pages/docPage/docSettings";
import Homepage from "./pages/index/Homepage";

export const privateRoutes = [
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/createDoc',
    element: <CreateDoc />,
  },
  {
    path: '/account',
    element: <Account />,
  },
  {
    path: '/docs/:documentationId/:documentId',
    element: <DocDetails />,
  },
  {
    path: '/docs/settings/:documentationId',
    element: <DocSettings />,
  },
  {
    path: '/docs/overview/:documentationId',
    element: <DocOverview />,
  },
]

export const publicRoutes = [
  {
    path: '/auth/login',
    element: <Login />,
  },
    {
    path: '/auth/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
