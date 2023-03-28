import axios from 'axios';
//import authHeader from 'authHeader';

//const backendURL = 'http://localhost:3000';
const backendURL = 'http://192.168.0.104:3000';

class UserService {
  async serviceNalogRu(object) {
    //return await axios.post(backendURL + path, object);
      return await axios({
        method: 'post',
        url: backendURL + '/registration/get-inn',
        //headers: authHeader(),
        data: object
      });
  }
  async sendSMS(phone) {
      return await axios({
        method: 'post',
        url: backendURL + '/registration/phone-code',
        //headers: authHeader(),
        data: { phone }
      });
  }
  async phoneCodeRegistered(phone) {
      const json = await axios({
        method: 'post',
        url: backendURL + '/registration/phone-code-registered',
        //headers: authHeader(),
        data: { phone }
      });
      return json.data
  }
  async checkCode(object) {
    const json = await axios({
      method: 'post',
      url: backendURL + '/registration/check-code',
      //headers: authHeader(),
      data: object
    });
    return json.data
  }
  async register(object) {
    const json = await axios({
      method: 'post',
      url: backendURL + '/courier/create-new',
      //headers: authHeader(),
      data: object
    });
    return json.data
  }
  async login(object) {
    const json = await axios({
      method: 'post',
      url: backendURL + '/courier/login',
      //headers: authHeader(),
      data: object,
      validateStatus: false
    });
    return json.data
  }
  /*async getGoogleAccountCallbackUrl(object) {
    const json = await axios({
      method: 'get',
      url: backendURL + '/google/get-url',
      //headers: authHeader(),
      data: object,
      validateStatus: false
    });
    return json.data
  }
  async getGoogleCookies(object) {
    const json = await axios({
      method: 'get',
      url: backendURL + '/google/get-profile',
      //headers: authHeader(),
      data: object,
      validateStatus: false
    });
    return json.data
  }*/
  async verifyGoogleToken(object) {
    const json = await axios({
      method: 'post',
      url: backendURL + '/google/verify-google-token',
      //headers: authHeader(),
      data: object,
      validateStatus: false
    });
    return json.data
  }
}

export default new UserService()