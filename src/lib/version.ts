import packageJson from "../../package.json";

/** Replaced at container start when APP_VERSION is set (see docker-entrypoint.sh). */
export const APP_VERSION_PLACEHOLDER = "__APP_VERSION__";

export function getAppVersion(): string {
  const fromEnv = process.env.APP_VERSION?.trim();
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    return APP_VERSION_PLACEHOLDER;
  }

  return packageJson.version;
}
