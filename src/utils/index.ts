/**
 * Ensures every env variable passed in 'env_vars' is defined and has a value.
 * @param {array} env_vars Array of strings with the env variables to check
 * @return {array} Array with the errored env vars that do not pass the check. If the array has any content then there are errors.
 */
export const checkEnvVars = (env_vars: Array<string>) => {
  const errored_vars: string[] = [];
  for (const env of env_vars) {
    if (typeof process.env[env] === "undefined" || process.env[env] === "") {
      errored_vars.push(env);
    }
  }

  return errored_vars;
};

/**
 * Process pagination in order to return elements in pages and in a determinate count
 * @param {number} page number of page that you want in your request
 * @param {number} count number of items you need every page
 * @return {object} Object with the page, the paga_size, offset and the page_size
 */
// TODO offset and page_size are not the same?
export const processPagination = (page: number, count: number) => {
  const page_number = page ? page : 1;
  const page_size = count ? count : 20;

  return { page: page_number, page_size: page_size, offset: (page_number - 1) * page_size, limit: page_size };
};

/**
 * Process pagination in order to return elements in pages and in a determinate count
 * @param {number} page requesting page
 * @param {number} pageSize all pages number
 * @param {number} count items in every page
 * @param {number} items all items
 * @return {object} Object with actual page, the total pages, the total items and the data (items)
 */
export const computePaginationRes = (page: number, pageSize: number, count: number, items: number) => {
  const realCount = count ? count : 0;
  const totalPages = realCount ? Math.ceil(realCount / pageSize) : 1;

  return { page: page, totalPages: totalPages, totalItems: realCount, items: items };
};
