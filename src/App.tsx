import './index.css';

import { ThemeProvider } from '@/components/dark-mode/theme-provider';
import { ModeToggle } from './components/dark-mode/mode-toggle';
import { useEffect, useState } from 'react';
import { MyCarousel } from './components/MyCarousel';

// import tempData from '../test.json';

import { MyAvatar } from './components/MyAvatar';

const url = 'https://api.github.com/users/mathoyer/repos';

const getRepos = async () => {
    const response = await fetch(url);
    const data: Repository[] = await response.json();
    // const data = tempData;
    const modifiedData = data.filter((item) => item.name !== 'MatHoyer');
    return modifiedData;
};

const getLanguages = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    let returnValue: string = '';
    for (const key in data) {
        if (!['HTML', 'CSS', 'Shell', 'Makefile', 'Perl', 'Roff'].includes(key)) {
            returnValue += `${key} `;
        }
    }
    console.log(returnValue);
    return 'JavaScript';
};

export const App = () => {
    const [repos, setRepos] = useState<Repository[]>([]);
    useEffect(() => {
        (async () => {
            const d = await getRepos();
            d.forEach((repo) => {
                (async () => {
                    repo.language = await getLanguages(repo.languages_url);
                    console.log(repo.language);
                })();
            });
            setRepos(d);
        })();
    }, []);

    return (
        <ThemeProvider>
            <ModeToggle />
            <div className="h-screen flex flex-col justify-center items-center">
                <MyAvatar />
                <MyCarousel repos={repos} />
            </div>
        </ThemeProvider>
    );
};
