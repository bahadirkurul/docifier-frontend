import { AuthGuard } from "./guards/auth-guard";
import NotFound from "./pages/NotFound";
import Account from "./pages/account/account";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import CreateDoc from "./pages/createDoc/CreateDoc";
import DocOverview from "./pages/docPage/docOverview";
import DocDetails from "./pages/docPage/docPage";
import DocSettings from "./pages/docPage/docSettings";
import Homepage from "./pages/index/Homepage";

export const routes = [
  {
    path: '/',
    element: <AuthGuard><Homepage /></AuthGuard>,
  },
  {
    path: '/createDoc',
    element: <AuthGuard><CreateDoc /></AuthGuard> ,
  },
  {
    path: '/account',
    element: <AuthGuard><Account /></AuthGuard>,
  },
  {
    path: '/docs',
    element: <AuthGuard><DocDetails /></AuthGuard>,
  },
  {
    path: '/docs/settings',
    element: <AuthGuard><DocSettings /></AuthGuard>,
  },
  {
    path: '/docs/overview',
    element: <AuthGuard><DocOverview /></AuthGuard>,
  },
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