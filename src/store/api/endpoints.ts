const baseURL = 'http://localhost:8080'

export const endpoints = {
  eventsNext: `${baseURL}/events/next`,
  eventsPast: `${baseURL}/events/past30days`,
  auth: `${baseURL}/admin/auth`
};
