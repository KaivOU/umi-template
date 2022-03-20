import { Location } from 'history';

// 生成对应长度随机数
export const random = (len: number) => {
  const dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let str = '';
  for (let i = 0; i < len; i += 1) {
    str += dict[Math.floor(Math.random() * dict.length)];
  }
  return str;
};

// 获取url的参数
export const getLocationSearch = (location: Location, key?: string) => {
  if (!location) {
    return '';
  }

  const { search } = location;
  if (!search) {
    return '';
  }

  const str = search.substr(1);
  const arr = str.split('&');
  const obj: { [keyword: string]: string | number } = {};
  arr.reduce((result, item) => {
    const newarr = item.split('=');
    return Object.assign(result, { [newarr[0]]: window.decodeURI(newarr[1]) });
  }, obj);
  return key ? obj[key] : obj;
};

export const clickCopy = (text: string) => {
  const copyNodes = document.createElement('input');
  copyNodes.setAttribute('value', text);
  document.body.appendChild(copyNodes);
  copyNodes.select();
  const cRes = document.execCommand('copy');
  return new Promise((res, rej) => {
    cRes ? res(cRes) : rej();
    document.body.removeChild(copyNodes);
  });
};
