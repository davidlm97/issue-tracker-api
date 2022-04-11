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

// TODO docs and comments and test
export const processPagination = (page, count) => {
  const page_number = !isNaN(page) && page && parseInt(page) ? parseInt(page) : 1;
  const page_size = !isNaN(count) && count && parseInt(count) ? parseInt(count) : 20;

  return { page: page_number, page_size: page_size, offset: (page_number - 1) * page_size, limit: page_size };
};

// TODO docs and comments and test
export const computePaginationRes = (page, pageSize, count, items) => {

  const realCount = count ? count : 0; 
  const totalPages = realCount ? Math.ceil(realCount / pageSize) : 1;

  return { page: page, totalPages: totalPages, totalItems: realCount, items: items };
};
