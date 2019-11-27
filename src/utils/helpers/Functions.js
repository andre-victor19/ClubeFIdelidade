import {PermissionsAndroid} from 'react-native';
import Geologation from 'react-native-geolocation-service';

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export function formataDinheiro(n) {
  return parseFloat(n)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
}

export const getCoordinates = () =>
  new Promise(async (resolve, reject) => {
    const permissao = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Exemplo',
        message: 'Exemplo',
      },
    );
    if (permissao === PermissionsAndroid.RESULTS.GRANTED) {
      Geologation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      reject('Sem permissão a localização.');
    }
  });

export function zeroPad(num, places) {
  return String(num).padStart(places, '0');
}

export function getInitials(string) {
  if (string) {
    const names = string.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
}
