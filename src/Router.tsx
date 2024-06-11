import { Route, Routes } from 'react-router-dom';
import { Home, JoinMe, NotFound, Profile, Repo, ReposList } from './pages';

export const routes = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    name: 'Profile',
    path: '/profile',
    element: <Profile />,
  },
  {
    name: 'Repos',
    path: '/repos',
    element: <ReposList />,
  },
  {
    name: 'Join Me',
    path: '/contact-me',
    element: <JoinMe />,
  },
];

export const Router = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="/repo/:repoName" element={<Repo />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
