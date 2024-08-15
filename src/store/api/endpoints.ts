const baseURL = 'http://localhost:8080'

export const endpoints = {
  events: `${baseURL}/events`,
  eventsNext: `${baseURL}/events/next`,
  eventsPast: `${baseURL}/events/past`,
  eventsNextTop: `${baseURL}/events/next/top`,
  eventsPastTop: `${baseURL}/events/past/top`,
  eventsNextFilter: `${baseURL}/events/next/filter`,
  eventsPastFilter: `${baseURL}/events/past/filter`,
  members: `${baseURL}/teams`,
  signIn: `${baseURL}/admin/auth`,
  checkAuth: `${baseURL}/admin/check`,
};
