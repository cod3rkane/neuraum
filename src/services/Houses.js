export const API_HOUSES_END_POINT = 'http://localhost:1337/houses';

export default class HousesService {
  fetch() {
    return fetch(API_HOUSES_END_POINT, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    }).then(response => response.json());
  }
};
