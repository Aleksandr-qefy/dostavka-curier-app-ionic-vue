import axios from './axios'

export default async function(phone) { // у функции нет имени
  return await axios.sendSMS(phone);
}