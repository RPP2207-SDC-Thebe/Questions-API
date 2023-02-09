import http from 'k6/http';
import { sleep } from 'k6';


export const options = {

  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 1,
  duration: '30s'
}

export default function putQuestionHelpful() {
  const baseURL = 'http://localhost:8080/qa'
  //max question_id: 3518963
  let randomID = Math.floor(Math.random() * (3518963 - 1) + 1)
  http.put(`${baseURL}/questions/${randomID}/helpful`);
  sleep(1);

}
