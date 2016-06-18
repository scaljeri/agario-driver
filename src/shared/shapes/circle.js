export default class Circle {
    constructor(victorFactory, numeric, data) {
        this._numeric = numeric;
        this._Victor = victorFactory;

        if (data) {
            this.approximate(data);
        }
    }

    get center() {
        return this._center;
    }

    get radius() {
        return this._radius;
    }

    approximate(data) {
        let A = [], b = [];

        data.forEach(function (i) {
            A.push([i.x, i.y, 1]);
            b.push(-Math.pow(i.x, 2) - Math.pow(i.y, 2));
        });

        let AT = this._numeric.transpose(A),
            Aa = this._numeric.dot(AT, A),
            ba = this._numeric.dot(AT, b),
            a  = this._numeric.solve(Aa, ba);

        this._center = this._Victor(
            Math.round(-.5 * a[0]),
            Math.round(-.5 * a[1])
        );

        this._radius = Math.sqrt((Math.pow(a[0], 2) + Math.pow(a[1], 2))/4 - a[2]);

        return this;
    }
}
