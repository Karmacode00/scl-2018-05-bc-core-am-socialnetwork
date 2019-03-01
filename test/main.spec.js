import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAGBMRLzapjlWC-GSgQSRTLjzHc8K-VEVg',
  authDomain: 'foodgramtest.firebaseapp.com',
  databaseURL: 'https://foodgramtest.firebaseio.com',
  projectId: 'foodgramtest',
  storageBucket: 'foodgramtest.appspot.com',
  messagingSenderId: '72516893220'
};

firebase.initializeApp(config);

global.firebase = firebase;
global.window = {
  firebase: firebase
};

import { guardar, leerPosts } from '../src/assets/js/data.js';

describe('guardar', () => {
  it('Deberia poder guardar una receta en la base de datos', () => {
    return guardar('Esta es una receta').then(guardar => {
      const callback = publicacion => {
        console.log(publicacion);
      };
      leerPosts(callback);
    });
  });
});
