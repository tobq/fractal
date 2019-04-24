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
        let gl = this.canvas.getContext("2d");
        gl.clearRect(0, 0, this.props.width, this.props.height);
        // gl.clear(gl.COLOR_BUFFER_BIT);
        const size = new Vec(this.props.width, this.props.height);
        let centre = size.divideScalar(2);
        for (let x = this.props.width; x--;)
            for (let y = this.props.height; y--;) {
                let z = new Vec(x, y).minus(centre).divideScalar(100);

                for (let i = Fractal.MAX_ITERATIONS; i--;)
                    z = new Vec(z.x * z.x - z.y * z.y, 2 * z.x * z.y).plus(this.props.constant);

                gl.fillStyle = `rgba(0, 0, 0, ${(1 - 1 / (1 + z.length()))})`;
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

function rerender(vec: Vec) {
    render(<Fractal
        height={SIZE}
        width={SIZE}
        constant={vec}
    />, main, main.lastElementChild);
}

document.addEventListener("click", e => {
    let size = new Vec(SIZE, SIZE);
    let newConstant = new Vec(e.pageX, e.pageY)
        .minus(size.divideScalar(2))
        .divide(size)
        .multiplyScalar(2);

    console.log(newConstant);
    rerender(newConstant);
});

rerender(new Vec(0, 0));
