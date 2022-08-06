import React from 'react';
import Box from './Box';
import './API.css';

class API extends React.Component {
    constructor(props) { //-----------------------------PROPS---------------------------------
        super(props)

        this.getAPIData = this.getAPIData.bind(this);
        this.state = {pokemon: [], numVisible: 0};
    }

    getAPIData() { //-----------------------------------USES CALLBACKS--------------------------------------
        const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + this.state.numVisible;
        fetch(url)
        .then((response) => { //------------------------ARROW 1-------------------------
            return response.json();
        })
        .then((response) => { //------------------------ARROW 2-------------------------
            const responsePokemon = response.results.map((item) => <Box name={item.name} type={item.type} url={item.url} key={item.name} />);
            this.setState((oldState) => ({
                numVisible: oldState.numVisible + 10,
                pokemon: oldState.pokemon.concat(responsePokemon)
            }))
            return response
        })
        .then((response) => { //------------------------ARROW 3-------------------------
            for (let i = 0; i < 10; i++){
                console.log(response.results[i].name + " is now visible");
            }
        })
    }

    componentDidMount() {
        console.log("The component has mounted.");
        this.getAPIData();
    }

    componentWillUnmount() {
        console.log("The component will unmount.");
    }

    render () {
        const someJSX = (
        <div>
            {this.state.pokemon}
            <button className="addPokemon" onClick={this.getAPIData}>More Pokemon</button><br /><br />
        </div>);
        return someJSX;
    }
}

export default API;