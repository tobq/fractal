import {Component, h, render} from "preact";
import Vec from "./vec";

interface Props {
    width: number,
    height: number,
    constant: Vec,
    zoom: number,
    offset: Vec,
    onMouseMove: JSX.EventHandler<MouseEvent>
}

export default class Fractal extends Component<Props> {
    private canvas: HTMLCanvasElement;
    private static readonly MAX_ITERATIONS = 100;

    componentDidMount(): void {
        this.draw();
    }


    draw() {
        const width = this.props.width;
        const height = this.props.height;

        let gl = this.canvas.getContext("2d");
        let imageData = gl.createImageData(width, height);
        // gl.clear(gl.COLOR_BUFFER_BIT);
        for (let x = width; x--;)
            for (let y = height; y--;) {
                let z = new Vec(x, y).minus(this.props.offset).divideScalar(this.props.zoom);
                const zOriginal = z;
                let base = (y * width + x) * 4;

                let iterationsLeft = Fractal.MAX_ITERATIONS;
                while (iterationsLeft-- > 1) {
                    z = new Vec(z.x * z.x - z.y * z.y, 2 * z.x * z.y).plus(zOriginal);
                    // z = new Vec(z.x * z.x - z.y * z.y, 2 * z.x * z.y).plus(this.props.constant);
                    if (z.x * z.x + z.y + z.y > 8) {
                        break;
                    }
                }
                // imageData.data[base + 3] = 255 / (1 + z.length());
                imageData.data[base + 3] = 255 * iterationsLeft / Fractal.MAX_ITERATIONS;
                // imageData.data[base + 3] = 255 / (1 + z.x * z.x + z.y + z.y);
            }

        gl.putImageData(imageData, 0, 0);
        console.log("DONE");
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
        if (this.props.height != nextProps.height
            || this.props.width != nextProps.width) return true;
        if (!this.props.constant.equals(nextProps.constant) ||
            this.props.zoom != nextProps.zoom ||
            !this.props.offset.equals(nextProps.offset)) {
            this.draw();
        }
        return false;
    }

    render() {
        return <canvas
            onMouseDown={e => this.props.onMouseMove(e)}
            width={this.props.width}
            height={this.props.height}
            ref={canvas => this.canvas = canvas}
        />;
    }
}