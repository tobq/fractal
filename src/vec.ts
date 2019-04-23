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

    minus(operand: Vec) {
        return new Vec(
            this.x - operand.x,
            this.y - operand.y
        );
    }

    multiply(operand: Vec) {
        return new Vec(
            this.x * operand.x,
            this.y * operand.y
        );
    }

    divide(operand: Vec) {
        return new Vec(
            this.x / operand.x,
            this.y / operand.y
        );
    }

    divideScalar(operand: number) {
        return this.divide(new Vec(operand, operand));
    }

    multiplyScalar(operand: number) {
        return this.multiply(new Vec(operand, operand));
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    unit(operand: Vec) {
        return this.divideScalar(this.length());
    }
}