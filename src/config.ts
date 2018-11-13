import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
}

export const firebaseConfig = {
	fire: {
      apiKey: "AIzaSyC0842gYDgwcX4FOhYTCNZQbhhtBO21x6E",
      authDomain: "trab-tai-42f93.firebaseapp.com",
      databaseURL: "https://trab-tai-42f93.firebaseio.com",
      projectId: "trab-tai-42f93",
      storageBucket: "trab-tai-42f93.appspot.com",
      messagingSenderId: "150222369178"
	}
}