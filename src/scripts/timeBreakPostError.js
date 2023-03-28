import {getItem, removeItem, setItem} from "./Storage";

class timeBreakFunctions {
  async get(storageKey) {
    //console.log(await getItem(storageKey))
    return await getItem(storageKey) > Date.now();
  }
  async remove(storageKey) {
    //console.log(await getItem(storageKey))
    await removeItem(storageKey + 'PostNumber');
  }
  async set(storageKey, maxPostNumber, breakTimeSec) {
    const postNumber = 1 + await getItem(storageKey + 'PostNumber');
    if (postNumber >= maxPostNumber) {
      await removeItem(storageKey + 'PostNumber');
      await setItem(storageKey, Date.now() + breakTimeSec * 1000);
    } else {
      await setItem(storageKey + 'PostNumber', postNumber);
    }
  }
}
export default new timeBreakFunctions()