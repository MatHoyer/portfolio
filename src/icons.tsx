import { C, Cplusplus, Docker, JavaScript, Python, TypeScript } from '@/components/Logo';

export const icons: Record<string, JSX.Element> = {
  javascript: <JavaScript height={25} width={25} />,
  'c++': <Cplusplus height={25} width={25} />,
  c: <C height={25} width={25} />,
  typescript: <TypeScript height={25} width={25} />,
  python: <Python height={25} width={25} />,
  dockerfile: <Docker height={25} width={25} />,
};

export const getIcons = (name: string, size: number) => {
  switch (name) {
    case 'javascript':
      return <JavaScript height={size} width={size} />;
    case 'c++':
      return <Cplusplus height={size} width={size} />;
    case 'c':
      return <C height={size} width={size} />;
    case 'typescript':
      return <TypeScript height={size} width={size} />;
    case 'python':
      return <Python height={size} width={size} />;
    case 'dockerfile':
      return <Docker height={size} width={size} />;
    default:
      return <></>;
  }
};
