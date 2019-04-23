import {Component, h, render} from "preact";
import Vec from "./vec";

interface Props {
    width: number,
    height: number
}

export default class Fractal extends Component<Props> {
    constant = new Vec(0, 0);
    iterate = (z: Vec) => z.plus(this.constant);

    render() {
        return <canvas width={this.props.width} height={this.props.height}/>;
    }
}

render(<Fractal height={300} width={300}/>, document.querySelector("section"));