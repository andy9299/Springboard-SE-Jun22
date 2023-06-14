### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
  React is a js library to build a website based on components.

- What is Babel?
  Babel is a utility that converts other code like jsx or newer ECMAScript code into backwards compatible versions for older browsers.

- What is JSX?
  JAX is a syntax that lets users write code more similar to HTML while inside js.

- How is a Component created in React?
  Create a function that returns one block of jsx html.

- What are some difference between state and props?
  State is local data stored in a component that can change.
  Props is data that can be passed from component to component usually from parent to child.
  They also cannot be modified.

- What does "downward data flow" refer to in React?
  The idea that components pass down data to children via props.

- What is a controlled component?
  It is a component where the state is controlled by react

- What is an uncontrolled component?
  It is a component where the state is controlled by some external factor (ie the the DOM for a form)

- What is the purpose of the `key` prop when rendering a list of components?
  It is a way for react to keep track of has changed in a list.

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
  If you change stuff in the array the index of the data might change.

- Describe useEffect. What use cases is it used for in React components?
  useEffect is a hook that makes a component do something after a render (by default the first and every render)
  You can also add a cleanup function for when it unmounts.

- What does useRef do? Does a change to a ref value cause a rerender of a component?
  useRef keeps data between renders, but it doesn't cause a render between renders.

- When would you use a ref? When wouldn't you use one?
  When you need to modify something in the DOM outside of react's control (like file uploads)
  When you need to store data that doesn't trigger a render when updated/needs to last till the component unmounts.
  You shouldn't use it if react can control the state of the DOM normally.

- What is a custom hook in React? When would you want to write one?
  They are js reuseable functions that can use react's features such as state.
  You should you them when you want to abstract logic, handle repeated tasks, or make code more readable.
