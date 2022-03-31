/**
 * Ensures every env variable passed in 'env_vars' is defined and has a value.
 * @param {array} env_vars - Array of strings with the env variables to check
 * @return {array} Array with the errored env vars that do not pass the check. If the array has any content then there are errors.
 */
export const checkEnvVars = (env_vars) => {
  const errored_vars: string[] = [];
  for (const env of env_vars) {
    if (typeof process.env[env] === "undefined" || process.env[env] === "") {
      errored_vars.push(env);
    }
  }

  return errored_vars;
};
