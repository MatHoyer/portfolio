import './index.css';

import { ThemeProvider } from '@/components/dark-mode/theme-provider';
import { useEffect } from 'react';

import { fetchRepos } from './fetch';
import { useDispatch } from 'react-redux';
import { setRepos } from './redux';
import { Router } from './pages/Router';
import { NavBar } from './components/NavBar';

const getRepos = async () => {
  const data: RepositoryFetch[] = await fetchRepos();
  const modifiedData = data.filter((item) => item.name !== 'MatHoyer');
  return modifiedData;
};

const getLanguages = (data: RepositoryFetch): Language[] => {
  const excludedLanguages = ['html', 'css', 'shell', 'makefile', 'perl', 'roff'];

  const filteredData = data.languages.edges.filter((edge) => !excludedLanguages.includes(edge.node.name.toLowerCase()));

  const totSize = filteredData.reduce((acc, edge) => acc + edge.size, 0);
  const languages = filteredData.map((edge) => ({
    name: edge.node.name.toLowerCase(),
    percentage: Math.round((edge.size / totSize) * 100),
  }));

  return languages;
};

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const d = await getRepos();
      const updatedRepos = d.map((repo) => ({
        name: repo.name,
        description: repo.description,
        stargazerCount: repo.stargazerCount,
        forkCount: repo.forkCount,
        languages: getLanguages(repo),
        url: `https://github.com/MatHoyer/${repo.name}`,
      }));
      console.log(updatedRepos);
      dispatch(setRepos(updatedRepos));
    })();
  }, []);

  return (
    <ThemeProvider>
      <NavBar />
      <Router />
    </ThemeProvider>
  );
};
