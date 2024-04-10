import './index.css';

import { ThemeProvider } from '@/components/dark-mode/theme-provider';
import { ModeToggle } from './components/dark-mode/mode-toggle';
import { useEffect, useState } from 'react';
import { ReposCarousel } from './components/ReposCarousel';

import { MyAvatar } from './components/MyAvatar';
import { fetchRepos } from './fetch';

const getRepos = async () => {
    const data: Repository[] = await fetchRepos(/*url*/);
    const modifiedData = data.filter((item) => item.name !== 'MatHoyer');
    return modifiedData;
};

const getLanguages = (data: Repository) => {
    const excludedLanguages = ['html', 'css', 'shell', 'makefile', 'perl', 'roff'];

    const languages = data.languages.edges
        .map((edge) => edge.node.name.toLowerCase())
        .filter((name) => !excludedLanguages.includes(name));

    return languages;
};

export const App = () => {
    const [repos, setRepos] = useState<Repository[]>([]);

    useEffect(() => {
        (async () => {
            const d = await getRepos();
            const updatedRepos = d.map((repo) => ({
                ...repo,
                languagesTab: getLanguages(repo),
                url: `https://github.com/MatHoyer/${repo.name}`,
            }));
            setRepos(updatedRepos);
        })();
    }, []);

    return (
        <ThemeProvider>
            <ModeToggle />
            <div className="w-screen h-screen flex flex-col space-y-5">
                <MyAvatar />
                <ReposCarousel repos={repos} />
            </div>
        </ThemeProvider>
    );
};
