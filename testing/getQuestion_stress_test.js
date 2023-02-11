import http from 'k6/http';
import { sleep } from 'k6';


export const options = {

  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 1000,
  duration: '30s'
}

export default function getQuestion() {
  const baseURL = 'http://localhost:8080/qa'
  //max product_id: 1000011
  let randomID = Math.floor(Math.random() * (1000011 - 1) + 1)
  const page = 1
  const count = 5
  http.get(`${baseURL}/questions?product_id=${randomID}&page=${page}&count=${count}`);
  sleep(1);
}
