import { C, Cplusplus, Docker, JavaScript, Python, TIconProps, TypeScript } from '@/components/Logo';

const languageIcons: Record<string, React.FC<TIconProps>> = {
  javascript: JavaScript,
  'c++': Cplusplus,
  c: C,
  typescript: TypeScript,
  python: Python,
  dockerfile: Docker,
};

export const availableLanguageIcons = Object.keys(languageIcons);

export const getLanguageIcon = (name: string, size: number = 25) => {
  const Icon = languageIcons[name];
  return Icon ? <Icon height={size} width={size} /> : null;
};
