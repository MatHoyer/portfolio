export type NavItem = {
  nameKey: "overview" | "profile" | "repositories" | "contact";
  path: string;
  method: "GET" | "POST";
  tagKey: "tagDeveloper" | "tagRepositories" | "tagContact";
};

export const navItems: NavItem[] = [
  { nameKey: "overview", path: "/", method: "GET", tagKey: "tagDeveloper" },
  { nameKey: "profile", path: "/profile", method: "GET", tagKey: "tagDeveloper" },
  { nameKey: "repositories", path: "/repos", method: "GET", tagKey: "tagRepositories" },
  { nameKey: "contact", path: "/contact-me", method: "POST", tagKey: "tagContact" },
];
