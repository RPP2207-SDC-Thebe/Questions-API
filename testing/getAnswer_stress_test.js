import http from 'k6/http';
import { sleep } from 'k6';


export const options = {

  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 100,
  duration: '30s'
}

export default function getAnswer() {
  const baseURL = 'http://localhost:8080/qa'
  //max question_id: 3518963
  let randomID = Math.floor(Math.random() * (3518963 - 1) + 1)

  const page = 1
  const count = 5
  http.get(`${baseURL}/questions/${randomID}/answers?count=${count}&page=${page}`);
  sleep(1);
}
