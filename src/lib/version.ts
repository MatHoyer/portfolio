import packageJson from "../../package.json";

/** Replaced in static assets at container start when needed (see docker-entrypoint.sh). */
export const APP_VERSION_PLACEHOLDER = "__APP_VERSION__";

/** Server/build only — pass the result into client components as a prop. */
export function getAppVersion(): string {
  return process.env.APP_VERSION?.trim() || packageJson.version;
}
