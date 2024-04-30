import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { Profile } from './Profile';
import { ReposList } from './ReposList';
import { Repo } from './Repo';
import { JoinMe } from './JoinMe';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/repos" element={<ReposList />} />
      <Route path="/repo/:repoName" element={<Repo />} />
      <Route path="/contact-me" element={<JoinMe />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
