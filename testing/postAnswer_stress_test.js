import http from 'k6/http';
import { sleep } from 'k6';


export const options = {

  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 5000,
  duration: '30s'
}

export default function postAnswer() {
  const baseURL = 'http://localhost:8080/qa'
  //max question_id: 3518963
  let randomID = Math.floor(Math.random() * (3518963 - 1) + 1)
  const payload = JSON.stringify({
    body: `test body id: ${randomID}`,
    name: `${randomID}_tester`,
    email: `test${randomID}@gmail.com`,
    photos: []
  })
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(`${baseURL}/questions/${randomID}/answers`, payload, params);
  sleep(1);

}
