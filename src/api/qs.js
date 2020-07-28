const qs = SERVER_URL === 'true'
  ? `http://${window.location.hostname}:20000/api/`
  : 'http://185.91.53.212:801/';
// const qs = 'http://nsk-dev-04:20000/api/';
export default qs;
