import axios from 'axios';

export const testInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

export const InstanceV1 = axios.create({
  baseURL: 'https://codetech.nworld.dev',
  withCredentials: true,
});
