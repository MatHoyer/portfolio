import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { Profile } from './Profile';
import { ReposList } from './ReposList';
import { Repo } from './Repo';

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="repos" element={<ReposList />} />
            <Route path="repo/:repoName" element={<Repo />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
