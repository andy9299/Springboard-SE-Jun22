### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
await-async
promises

- What is a Promise?
its a thing that takes some time to resolve into a value (or error). its used for asynchronous operations

- What are the differences between an async function and a regular function?
an async function allows the function to use the await keyword and it returns a promise

- What is the difference between Node.js and Express.js?
express is a framework based on node for building web apps
node is a environment for building server side apps with javascript 

- What is the error-first callback pattern?
in a callback function the first parameter is for the error while the second is for whatever successful response

- What is middleware?
its code that runs in hte middle of the request-response cycle

- What does the `next` function do?
next allows the request go to the next route/middlware

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
runs sequentially not parallel, so it can be faster
needs try-catch or then/catch() in case one of the getJSON fails
Can use Promise.all()
```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
