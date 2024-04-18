import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { Profile } from './Profile';
import { ReposList } from './ReposList';
import { Repo } from './Repo';

export const Router = () => {
  return (
    <Routes>
      <Route path="/portfolio" element={<Home />} />
      <Route path="/portfolio/profile" element={<Profile />} />
      <Route path="/portfolio/repos" element={<ReposList />} />
      <Route path="/portfolio/repo/:repoName" element={<Repo />} />
      <Route path="/portfolio/*" element={<NotFound />} />
    </Routes>
  );
};
