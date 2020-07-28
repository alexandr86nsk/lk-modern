const qs = SERVER_URL === 'true'
  ? `http://${window.location.hostname}:20000/api/`
  : 'http://nsk-1cprog-01:801/';
// const qs = 'http://nsk-dev-04:20000/api/';
export default qs;
