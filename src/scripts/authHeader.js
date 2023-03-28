import * as Storage from 'Storage';

export default async function authHeader() {

  let token = await Storage.getItem('token');

  if (token) {
    // for Node.js Express back-end
    return { 'x-access-token': token };
  } else {
    return {};
  }
}