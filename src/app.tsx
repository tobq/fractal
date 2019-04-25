import Vec from "./vec";
import {Component, h, render} from "preact";
import Fractal from "./index";


const main = document.querySelector("section");

interface Props {
    width: number,
    height: number
}

interface State {
    zoom: number,
    centre: Vec,
    size: Vec,
}

class App extends Component<Props, State> {
    private static readonly ZOOM_SPEED = 1.5;

    constructor(props: Props) {
        super(props);
        document.addEventListener("wheel", e => {
            let delta = -e.deltaY / 100;
            console.log(this.state.zoom * App.ZOOM_SPEED ** delta);
            this.setState({zoom: this.state.zoom * App.ZOOM_SPEED ** delta});
        });
    }

    state = {
        zoom: 100,
        centre: new Vec(0, 0),
        size: new Vec(this.props.width, this.props.height),
    };

    render() {
        return <Fractal
            height={this.props.height}
            width={this.props.width}
            constant={new Vec(-0.9, 0.3)}
            zoom={this.state.zoom}
            offset={this.state.centre}
            onMouseMove={e => {
                console.log();

                this.setState({
                    centre:this.state.centre.minus( new Vec(e.pageX, e.pageY)
                        .minus(this.state.size.divideScalar(2))
                        .divideScalar(this.state.zoom))
                        // .minus(this.state.centre)
                })
            }}
        />
    }
}

render(<App width={1000} height={800}/>, main);