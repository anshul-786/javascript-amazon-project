const xhr = new XMLHttpRequest(); // creates an HTTP message (request) to be sent to the backend

// this event listener will wait for the response to load
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev'); // sets the request's method and the resource (URL) to send the request to
xhr.send(); // this is asynchronous code since response takes time to travel over the internet

/*
  -> xhr.response // this will be undefined since response has not loaded yet
  -> status code starting with 2 succeeded and starting 4 (our problem) or 5 (server problem) failed
  -> list of backend URL paths is the backend API
  -> JSON is used to send JS objects across the internet to the backend
  -> using a browser is same as making a GET request
*/