import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from './components/Rank/Rank';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

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
            imageUrl: '',
            box: {}
        }
    }

    calculateFaceLocation = (data) => {
        const clarifiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifiFace.left_col * width,
            topRow: clarifiFace.top_row * height,
            rightCol: width - (clarifiFace.right_col * width),
            bottomRow: height - (clarifiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    };

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particlesOptions}/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition box= {this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
        );
    }
}

export default App;
