export default class Vec {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plus(operand: Vec) {
        return new Vec(
            this.x + operand.x,
            this.y + operand.y
        );
    }
}