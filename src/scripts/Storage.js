/*import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;*/
import { Storage } from '@ionic/storage';
const store = new Storage();
store.create();

/*
// JSON "set" example
async setObject() {
  await Storage.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "get" example
async getObject() {
  const ret = await Storage.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}*/

async function setItem(key, value) {
  console.log(value);
  console.log(key);
  await store.set(key, JSON.stringify(value));
  /*await store.set({
    key: key, //'name',
    value: JSON.stringify(value) //'Max'
  });*/
}

async function getItem(key) {
  console.log(key);
  //const { value } = await store.get({ key: 'name' });
  const value = await store.get( key );
  console.log('Got item: ', value);
  return JSON.parse(value)
}

async function removeItem(key) {
  await store.remove( key );
}
/*
async removeItem() {
  await Storage.remove({ key: 'name' });
}

async keys() {
  const { keys } = await Storage.keys();
  console.log('Got keys: ', keys);
}

async clear() {
  await Storage.clear();
} */

export {setItem, getItem, removeItem};