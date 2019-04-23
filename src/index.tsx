import {Component, h, render} from "preact";
import Vec from "./vec";

interface Props {
    width: number,
    height: number,
    constant: Vec
}

export default class Fractal extends Component<Props> {
    private canvas: HTMLCanvasElement;
    private static readonly MAX_ITERATIONS = 100;

    componentDidMount(): void {
        this.draw();
    }


    draw() {
        let gl = this.canvas.getContext("webgl");
        gl.clear(gl.COLOR_BUFFER_BIT);
        const size = new Vec(this.props.width, this.props.height);
        let centre = size.divideScalar(2);
        for (let x = this.props.width; x--;)
            for (let y = this.props.height; y--;) {
                let z = new Vec(x, y).minus(centre).divideScalar(100);
                let iterationsLeft = Fractal.MAX_ITERATIONS;
                while (z.x * z.x + z.y * z.y < 4 && iterationsLeft-- > 1) {
                    z = new Vec(z.x * z.x - z.y * z.y, 2 * z.x * z.y).plus(this.props.constant);
                }
                gl.fillStyle = `rgba(0, 0, 0, ${iterationsLeft / Fractal.MAX_ITERATIONS})`;
                // console.log(gl.fillStyle);
                gl.fillRect(x, y, 1, 1);
            }
        console.log("DONE");
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
        if (this.props.height != nextProps.height
            || this.props.width != nextProps.width) return true;
        if (!this.props.constant.equals(nextProps.constant)) {
            this.draw();
        }
        return false;
    }

    render() {
        return <canvas
            width={this.props.width}
            height={this.props.height}
            ref={canvas => this.canvas = canvas}
        />;
    }
}

const main = document.querySelector("section");
const SIZE = 600;
document.addEventListener("mousemove", e => {
    let size = new Vec(SIZE, SIZE);
    let newConstant = new Vec(e.pageX, e.pageY)
        .minus(size.divideScalar(2))
        .divide(size)
        .multiplyScalar(2);

    // newConstant = new Vec(0, 0);
    console.log(    newConstant);

    render(<Fractal
        height={SIZE}
        width={SIZE}
        constant={newConstant}
    />, main, main.lastElementChild);
});