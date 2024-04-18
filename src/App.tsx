import './index.css';

import { ThemeProvider } from '@/components/dark-mode/theme-provider';
import { useEffect } from 'react';

import { fetchRepos } from './fetch';
import { useDispatch } from 'react-redux';
import { setRepos } from './redux';
import { Router } from './pages/Router';
import { NavBar } from './components/NavBar';

const getRepos = async () => {
  const data: FetchTab = await fetchRepos();
  data.repositories.nodes = data.repositories.nodes.filter((item) => item.name !== 'MatHoyer');
  return data;
};

const getLanguages = (data: RepositoryFetch): Language[] => {
  const excludedLanguages = ['html', 'css', 'shell', 'makefile', 'perl', 'roff'];

  const filteredData = data.languages.edges.filter(
    (edge) => !excludedLanguages.includes(edge.node.name.toLowerCase()) && edge.size > 100
  );

  const totSize = filteredData.reduce((acc, edge) => acc + edge.size, 0);
  const languages = filteredData.map((edge) => ({
    name: edge.node.name.toLowerCase(),
    percentage: Math.round((edge.size / totSize) * 100),
  }));

  return languages;
};

const getAllLanguagesSize = (data: FetchTab): Language[] => {
  const excludedLanguages = ['html', 'css', 'shell', 'makefile', 'perl', 'roff'];

  const languages = data.repositories.nodes.reduce((acc: { [key: string]: number }, node) => {
    node.languages.edges.forEach((edge) => {
      if (excludedLanguages.includes(edge.node.name.toLowerCase())) return;
      if (acc[edge.node.name]) {
        acc[edge.node.name] += edge.size;
      } else {
        acc[edge.node.name] = edge.size;
      }
    });
    return acc;
  }, {});

  const mastery = 250000;
  const allStats = Object.entries(languages)
    .map(([name, totalSize]) => ({ name, totalSize }))
    .map((lang) => ({
      name: lang.name,
      totalSize: lang.totalSize > mastery ? mastery : lang.totalSize,
    }));
  return allStats.map((lang) => ({
    name: lang.name,
    percentage: Math.round((lang.totalSize / mastery) * 100),
  }));
};

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const d = await getRepos();
      // console.log(d);
      const updatedRepos = d.repositories.nodes.map((repo) => ({
        name: repo.name,
        description: repo.description,
        stargazerCount: repo.stargazerCount,
        forkCount: repo.forkCount,
        languages: getLanguages(repo),
        url: `https://github.com/MatHoyer/${repo.name}`,
      }));

      const globalData: GlobalData = {
        email: d.email,
        company: d.company,
        location: d.location,
        totalCommitContributions: d.contributionsCollection.totalCommitContributions,
        totalRepos: d.repositories.totalCount,
        languagesCount: getAllLanguagesSize(d),
        repositories: updatedRepos as Repository[],
      };
      // console.log(globalData);

      dispatch(setRepos(globalData));
    })();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <NavBar />
      <Router />
    </ThemeProvider>
  );
};
