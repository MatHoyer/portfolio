import { RepoCard } from '@/components/RepoCard';
import { setScroll } from '@/redux';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const ReposList = () => {
  const repos = useSelector((state: RootStateRepos) => state.repos.repositories);
  const allLanguages = [...new Set(repos.flatMap((repo) => repo.languages.map((lang) => lang.name)))];
  const scrollPosition = useSelector((state: RootStateScroll) => state.scroll.scroll);
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from;

  const scrollDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollDivRef.current) {
      if (!from) {
        scrollDivRef.current.scrollTop = 0;
        dispatch(setScroll(0));
      } else scrollDivRef.current.scrollTop = scrollPosition;

      const handleScroll = () => {
        if (scrollDivRef.current) dispatch(setScroll(scrollDivRef.current.scrollTop));
      };

      scrollDivRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (scrollDivRef.current) scrollDivRef.current.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div ref={scrollDivRef} className="h-screen pt-20 overflow-auto">
      <div className="flex flex-col justify-center items-center space-y-10">
        {allLanguages.map((lang) => {
          const fRepos = repos.filter((repo) => repo.languages.some((language) => language.name === lang));
          return (
            <div key={lang}>
              <h1 className="text-4xl">{lang.capitalize()}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {fRepos.map((repo) => (
                  <RepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
