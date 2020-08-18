const unirest = require('unirest');

  unirest
  .get('https://www.universal-tutorial.com/api/getaccesstoken')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 
  "api-token":"wGc78ESzThAizD6YiHEG038nTIqTPgnwhxKQtcqzW6U6DUA5aS001yjUpknRt2Tw_M4",
  "user-email": "ibrarmunir009@gmail.com"})
  .send()
  .then((response) => {
    console.log(response.body)
  })
const getCountryList = async (callback) => {
   const response = await unirest
  .get('https://www.universal-tutorial.com/api/countries/')
  .headers({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJpYnJhcm11bmlyMDA5QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IndHYzc4RVN6VGhBaXpENllpSEVHMDM4blRJcVRQZ253aHhLUXRjcXpXNlU2RFVBNWFTMDAxeWpVcGtuUnQyVHdfTTQifSwiZXhwIjoxNTk3ODIxNzcyfQ.JJvt-hCIN0qLBjM7MiuIkB1-5ewdVldo1AKhE0AeKEA',
    "api-token":"wGc78ESzThAizD6YiHEG038nTIqTPgnwhxKQtcqzW6U6DUA5aS001yjUpknRt2Tw_M4",
    'Accept': 'application/json'

  })
  .send();
  console.log(response.body);
  callback(response.body);
}
unirest
  .get('https://www.universal-tutorial.com/api/states/United States')
  .headers({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJpYnJhcm11bmlyMDA5QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IndHYzc4RVN6VGhBaXpENllpSEVHMDM4blRJcVRQZ253aHhLUXRjcXpXNlU2RFVBNWFTMDAxeWpVcGtuUnQyVHdfTTQifSwiZXhwIjoxNTk3ODIxNzcyfQ.JJvt-hCIN0qLBjM7MiuIkB1-5ewdVldo1AKhE0AeKEA',
    "api-token":"wGc78ESzThAizD6YiHEG038nTIqTPgnwhxKQtcqzW6U6DUA5aS001yjUpknRt2Tw_M4",
    'Accept': 'application/json'

  })
  .send()
  .then(response => {
    console.log(response.body);
  })
  .catch(err => console.log(err));

module.exports = getCountryList;