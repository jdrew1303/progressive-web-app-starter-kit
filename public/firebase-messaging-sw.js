//[*] Importing Firebase Needed Dependecies
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// [*] Firebase Configurations
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
};

//[*] Initializing our Firebase Application.
firebase.initializeApp(config);

// [*] Initislaizing the Firebase Messaging Object.
const messaging = firebase.messaging();

// [*] SW Install State Event.
self.addEventListener('install', (event) => {
  console.log("Install Step, let's cache some files =D");
  //[*] Let's cache a bit !
  event.waitUntil(
       caches.open('pwa').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/app.js'
            ]).then(() => self.skipWaiting());
        })
    );
});

// [*] SW Activate State Event.
self.addEventListener('activate',(event) => {
	console.log('Activated!', event);
});

// [*] SW Fetch Event.
self.addEventListener('fetch', (event) => {
	console.log('Let\'s get some Data');
	console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// [*] Special object let us handle our Background Push Notifications
messaging.setBackgroundMessageHandler((payload) => {
    console.log();

    const notificationOptions = {
        body: payload.data.msg,
        icon: "images/icon.jpg"
    }
    self.addEventListener('notificationclick', (event) => {
        var messageId = event.notification.data;

        event.notification.close();

        if (event.action === 'like') {
          console.log("Goin to like something !");
        } else if (event.action === 'dislike') {
          console.log("Goin to dislike something !");
        } else {
          console.log("wh00t !");
        }
    }, false);
    return self.registration.showNotification(payload.data.title,
        notificationOptions);
});
