const qs = SERVER_URL === 'true'
  ? `http://${window.location.hostname}:20000/api/`
  : 'http://10.168.1.203:8081/';
// const qs = 'http://nsk-1cprog-01:801/';
export default qs;
