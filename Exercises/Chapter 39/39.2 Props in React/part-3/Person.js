const Person = (props) => (
  <div>
    <p>Learn some information about this person: </p>
    <ul>
      <li>Name: {props.name.slice(0, 6)}</li>
      <li>Age: {props.age}</li>
    </ul>
    <h3>{(props.age > 18) ? "Please go vote!" : "You must be 18 to vote"}</h3>
    <h4>Hobbies:</h4>
    <ul>
      {props.hobbies ? props.hobbies.map(hobby => <li>{hobby}</li>) : <li>No Hobbies!</li>}
    </ul>
  </div>
);