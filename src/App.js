import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from './components/rank/Rank';
import FaceRecognition from "./components/faceRecognition/FaceRecognition";

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
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl:''
        }
    }

    onInputChange = (event) => {
        console.log(event.target.value);
    };
    onButtonSubmit = () => {
        this.setState({imageUrl:input})
        app.models.predict(
            Clarifai.COLOR_MODEL,
            "https://samples.clarifai.com/face-det.jpg")
            .then(
                function (response) {
                    console.log(response);
                },
                function (err) {
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
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmi     t={this.onButtonSubmit}/>
                <FaceRecognition/>
            </div>
        );
    }
}

export default App;
