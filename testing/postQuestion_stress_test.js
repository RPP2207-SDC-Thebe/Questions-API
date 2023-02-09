import http from 'k6/http';
import { sleep } from 'k6';


export const options = {

  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  vus: 1,
  duration: '30s'
}

export default function postQuestion() {
  const baseURL = 'http://localhost:8080/qa'
  //max product_id: 1000011
  let randomID = Math.floor(Math.random() * (1000011 - 1) + 1)
  const payload = JSON.stringify({
    product_id: randomID,
    body: `test body id: ${randomID}`,
    name: `${randomID}_tester`,
    email: `test${randomID}@gmail.com`
  })
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(`${baseURL}/questions/`, payload, params);
  sleep(1);
}
