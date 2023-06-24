### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
  It is to allow routing in the front end which makes it single page.

- What is a single page application?
  It is a website that updates its current web page instead of refreshing and loading a new page.

- What are some differences between client side and server side routing?
  Server side - needs to keep making requests to the server to rerender
  Client side - requires JS on the client browser

- What are two ways of handling redirects with React Router? When would you use each?
  (v6) Navigate component or useHistory
  navigate can keep the history clean while with useHistory the user can go back

- What are two different ways to handle page-not-found user experiences using React Router?
  Redirect or 404 page

- How do you grab URL parameters from within a component using React Router?
  set up the route as path "/path/:param" and then useParams in the child component of the route

- What is context in React? When would you use it?
  It is a way to give a piece of data to every child component that is nested in the provider.
  You should use it when you need to pass something down a lot of child components when the data is
  stored in a much higher level.

- Describe some differences between class-based components and function
  components in React.
  Class components tend to be more complicated/wordier
  states and props are initialized in the constructor
  need to bind this when passing methods
  lifecycle methods (componentDidMount, componentDidUpdate, etc)

- What are some of the problems that hooks were designed to solve?
  mixins/higher order components
  much duplication of code
  hooks are more portable/easy to test
