import { C, Cplusplus, Docker, JavaScript, Python, TypeScript } from '@/components/Logo';

export const icons: Record<string, JSX.Element> = {
    javascript: <JavaScript height={25} width={25} />,
    'c++': <Cplusplus height={25} width={25} />,
    c: <C height={25} width={25} />,
    typescript: <TypeScript height={25} width={25} />,
    python: <Python height={25} width={25} />,
    dockerfile: <Docker height={25} width={25} />,
};
