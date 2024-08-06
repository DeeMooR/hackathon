const baseURL = 'http://localhost:8080'

export const endpoints = {
  event: `${baseURL}/event`,
  eventsNextTop: `${baseURL}/events/next/top`,
  eventsPastTop: `${baseURL}/events/past/top`,
  eventsNext: `${baseURL}/events/next/filter`,
  eventsPast: `${baseURL}/events/past/filter`,
  auth: `${baseURL}/admin/auth`
};
