import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from './components/rank/Rank';

const app = new Clarifai.App({
    apiKey: 'ef1582b0063d4b87a1e2e624f79c61e9'
});

const particlesOptions =
    {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            }
        },
    };

class App extends React.Component {
    constructor(){
        super();
        this.state ={
            input: ''
        }
    }

    onInputChange = (event) =>{
        console.log(event.target.value);
    };
    onButtonSubmit = () =>{
        app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
            function(response) {
               console.log(response);
            },
            function(err) {
                // there was an error
            }
        );

    };
    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particlesOptions}/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            </div>
        );
    }
}

export default App;
