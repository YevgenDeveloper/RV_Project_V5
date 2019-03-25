// @flow

import { storageNames, googleStorageUrl, imageGateUrl } from 'client/constants';

export function checkAndUpdateAppVersion(): boolean {
  const currentVersion = process.env.APP_VERSION || '';
  const storedVersion = localStorage.getItem(storageNames.APP_VERSION);

  if (!storedVersion || storedVersion !== currentVersion) {
    localStorage.setItem(storageNames.APP_VERSION, currentVersion);
    return true;
  }

  return false;
}

export function isAuthorized() {
  const token = localStorage.getItem(storageNames.AUTH_TOKEN);
  return !!token;
}

export async function login(value: array) {
  const email = value.email;
  const password = value.password;

  const res = await fetch(
    `https://railvieweu.dev-test.pro/backend/auth.php?email=${email}&password=${password}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/text',
        'Content-Type': 'application/text',
      },
    },
  );
  const result = await res.text();
  console.log(result);
  if (result === 'valid') {
    localStorage.setItem(storageNames.AUTH_TOKEN, 'Tmp token');
    localStorage.setItem('Current_user', email);
    return result;
  }
  localStorage.removeItem('Current_user');
  return result;
}

export function logout() {
  localStorage.removeItem(storageNames.AUTH_TOKEN);
}

export async function addAlias(name: string) {
  const email = localStorage.getItem('Current_user');
  const res = await fetch(
    `https://railvieweu.dev-test.pro/backend/alias.php?email=${email}&aliasname=${name}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  console.log(res);
}

export async function getRidesList() {
  const res = await fetch(
    `https://railvieweu.dev-test.pro/backend/databaselogic.php`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await res.json();
  return result;
}

export async function getImagesFromCamera(ride: string, camera: string) {
  const res = await fetch(
    `https://www.railview.eu/viewer/getImageList.php?tableName=${ride}__${camera}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  const text = await res.text();

  if (!text) {
    return [];
  }
  return text.split('|');
}

export function getImageUrl(ride: string, camera: string, image: string) {
  return `${googleStorageUrl}/${ride}/${camera}/${image}`;
}

export function getImageGateUrl(imageUrl: string) {
  return `${imageGateUrl}?url=${encodeURIComponent(imageUrl)}`;
}

export function getStartCoords(
  event: MouseEvent | TouchEvent,
  element: HTMLElement,
) {
  const rect = element.getBoundingClientRect();

  // $FlowFixMe
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // $FlowFixMe
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // $FlowFixMe
  const pageX = event.pageX || event.touches?.[0].pageX || 0;

  // $FlowFixMe
  const pageY = event.pageY || event.touches?.[0].pageY || 0;

  return {
    x: pageX - rect.left + scrollTop,
    y: pageY - rect.top + scrollLeft,
    top: rect.top,
    left: rect.left,
    pageX,
    pageY,
  };
}
