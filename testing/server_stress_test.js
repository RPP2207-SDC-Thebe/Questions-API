import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 100,
  duration: '30s'
}

export default function test() {
  const baseURL = 'http://localhost:8080'
  http.get(`${baseURL}/test`);
  sleep(1);
}




