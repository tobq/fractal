import {Component, h, render} from "preact";
import Vec from "./vec";

export default class Fractal extends Component {
    constant = new Vec(0, 0);
    iterate = (z: Vec) => z.plus(this.constant);

    render() {
        return <canvas></canvas>;
    }
}

render(<Fractal/>, document.querySelector("section"));