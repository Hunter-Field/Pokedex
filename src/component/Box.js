import React from 'react';
import './Box.css';

function upperCaseName(props) { //---------------------FUNCTIONAL COMPONENT 1-------------------------------
  let finalCaps = props.charAt(0).toUpperCase() + props.slice(1);
  return <h2><strong>{finalCaps}</strong></h2>;
}

function addSpace(num) { //--------FUNCTIONAL COMPONENT 2 + RUNS CODE BEFORE RETURNING-------------
  let blanks = [];
  for (let i = 0; i < num; i++) {
    blanks.push(<br></br>)
  }
  return (
    <div>{blanks}</div>
  );
}

function setHealth() { //---------------------FUNCTIONAL COMPONENT 3-------------------------------
  console.log('testing')
  console.log(arguments)
  return (
    <div>
      <strong>Ability:</strong> {arguments[0]}
      {addSpace(1)}
      <strong>Health:</strong> {arguments[1]}
    </div>
  );
}

function flipPokemon(num) {
  if (num === 0) {
    return 1
  }
  else {
    return 0
  }
}

function upperCase(props) {
  return props.charAt(0).toUpperCase() + props.slice(1);
}

class Box extends React.Component {
  constructor(props) {
        super(props)

        this.getAPIData = this.getAPIData.bind(this);
        this.state = {imageList: ""};
        this.newState = this.newState.bind(this);
  }

  async getAPIData() {
      const url = this.props.url;
      const response = await fetch(url);
      const responseJSON = await response.json();
      const imageSrc = responseJSON.sprites.front_default;
      const imageSrc2 = responseJSON.sprites.front_shiny;

      this.setState(
        {
          hp: responseJSON.stats[0].base_stat,
          ability: upperCase(responseJSON.abilities[0].ability.name),
          type: upperCase(responseJSON.types[0].type.name),
          index: 0,
          imageList: [imageSrc, imageSrc2]
        }
      );
  }

  componentDidMount() {
    this.getAPIData();
  }

  newState() {
    this.setState({index : flipPokemon(this.state.index)})
  }

  render () {
    return (
      <div className="spacing">
        <div className="box">
          <button className="flipClick" onClick={this.newState}>
            <img className="image" src={this.state.imageList[this.state.index]} alt="Pokemon"></img>
          </button>
          {upperCaseName(this.props.name)}
          {setHealth(this.state.ability, this.state.hp)}
          {addSpace(1)}
          <p className="type" type-color={this.state.type}>  <strong>Type:</strong>  {this.state.type}</p>
          {addSpace(1)}
        </div>
      </div>
    );
  }
}

export default Box;