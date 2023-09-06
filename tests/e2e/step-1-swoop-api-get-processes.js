import http from 'k6/http';
import {check} from 'k6';


export default function() {
  console.log('Executing HTTP GET http://' + __ENV.API_HOST + '/processes/');
  const swoopApiProcesses = http.get('http://' + __ENV.API_HOST + '/processes/');
  console.log('Response of HTTP GET http://' + __ENV.API_HOST + '/processes/: ', swoopApiProcesses.json());
  check(swoopApiProcesses, {
    'status of SWOOP API GET /processes was 200': (r) => r.status == 200
  });
  check(swoopApiProcesses, {
    'response of SWOOP API GET /processes contains a list of processes': (r) => r.json().processes.constructor === Array
  });
  check(swoopApiProcesses, {
    'response of SWOOP API GET /processes contains mirror workflow': (r) => r.json().processes.filter(p => p.id == "mirror").length > 0
  });
}
