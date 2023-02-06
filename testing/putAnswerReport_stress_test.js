import http from 'k6/http';
import { sleep } from 'k6';


export const options = {

  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 10000,
  duration: '30s'
}

export default function putAnswerReport() {
  const baseURL = 'http://localhost:8080/qa'
  //max question_id: 3518963
  let randomID = Math.floor(Math.random() * (3518963 - 1) + 1)
  http.put(`${baseURL}/answers/${randomID}/report`);
  sleep(1);

}
