const baseURL = 'http://localhost:8080'

export const endpoints = {
  events: `${baseURL}/events`,
  eventsNextTop: `${baseURL}/events/next/top`,
  eventsPastTop: `${baseURL}/events/past/top`,
  eventsNext: `${baseURL}/events/next/filter`,
  eventsPast: `${baseURL}/events/past/filter`,
  setMembers: `${baseURL}/participants`,
  auth: `${baseURL}/admin/auth`
};
