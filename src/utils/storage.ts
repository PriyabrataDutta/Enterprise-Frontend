const PREFIX = 'app_';

export const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem(`${PREFIX}token`) as string),
  setToken: (token: string) => window.localStorage.setItem(`${PREFIX}token`, JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem(`${PREFIX}token`),
};
