const App = () => (
  <div>
    <Tweet username="Guy1" name="Mike" date={new Date().toDateString()} message="WOW" />
    <Tweet username="Guy2" name="John" date={new Date().toDateString()} message="WOW!" />
    <Tweet username="Guy3" name="Bob" date={new Date().toDateString()} message="WOW!!!!!!!!!!" />
  </div>
);