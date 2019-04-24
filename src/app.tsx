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
    private static readonly ZOOM_SPEED = 1.1;

    constructor(props: Props) {
        super(props);
        document.addEventListener("wheel", e => {
            let multiplier = e.deltaY < 0 ? App.ZOOM_SPEED : 1 / App.ZOOM_SPEED;
            this.setState({zoom: this.state.zoom * multiplier});
            console.log(this.state.zoom);
        });
    }

    state = {
        zoom: 100,
        centre: new Vec(this.props.width, this.props.height).divideScalar(2),
        size: new Vec(this.props.width, this.props.height),
    };

    render() {
        return <Fractal
            height={this.props.height}
            width={this.props.width}
            constant={new Vec(0, 0)}
            zoom={this.state.zoom}
            offset={this.state.centre}
            onMouseMove={e => {
                this.setState({
                    centre: this.state.size.minus(new Vec(e.pageX, e.pageY))
                })
            }}
        />
    }
}

render(<App width={1000} height={800}/>, main);