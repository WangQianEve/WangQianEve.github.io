function derivativeOfCubicBezier(p0, p1, p2, p3) {
    var a = 3 * (p1 - p0);
    var b = 6 * (p2 - p1);
    var c = 3 * (p3 - p2);
    return function (t) {
        return a * t * (1 - t) * (1 - t) + b * (1 - t) * t + c * t * t;
    }
}


function solveQuadraticEquation(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return [];
    } else {
        const sqrtD = Math.sqrt(discriminant);
        return [
            (-b + sqrtD) / (2 * a),
            (-b - sqrtD) / (2 * a)
        ];
    }
}

function solveCubicEquation(a, b, c, d) {

    if (!a) return solveQuadraticEquation(b, c, d);

    b /= a;
    c /= a;
    d /= a;

    const p = (3 * c - b * b) / 3;
    const q = (2 * b * b * b - 9 * b * c + 27 * d) / 27;
    const C = -b / 3;

    if (p === 0) {
        return [Math.pow(-q, 1 / 3) + C];
    } else if (q === 0) {
        const sqrtP = Math.sqrt(-p);
        return [C, sqrtP + C, -sqrtP + C];
    } else {
        const q2 = q / 2, p3 = p / 3;
        const discriminant = q2 * q2 + p3 * p3 * p3;
        if (discriminant === 0) {
            return [Math.pow(q2, 1 / 3) + C];
        } else if (discriminant > 0) {
            const sqrtD = Math.sqrt(discriminant);
            return [Math.pow(-q2 + sqrtD, 1 / 3) - Math.pow(q2 + sqrtD, 1 / 3) + C];
        } else {
            const r = Math.pow(-p3, 1.5);
            const phi = Math.acos(-q2 / r);
            const s = 2 * Math.pow(r, 1 / 3);
            return [
                s * Math.cos(phi / 3) + C,
                s * Math.cos((phi + 2 * Math.PI) / 3) + C,
                s * Math.cos((phi + 4 * Math.PI) / 3) + C
            ];

        }

    }
}

function solveCubicBezier(p0, p1, p2, p3, x) {
    p0 -= x;
    p1 -= x;
    p2 -= x;
    p3 -= x;

    const a = p3 - 3 * p2 + 3 * p1 - p0;
    const b = 3 * p2 - 6 * p1 + 3 * p0;
    const c = 3 * p1 - 3 * p0;
    const d = p0;

    const roots = solveCubicEquation(a, b, c, d);

    const result = [];
    for (let root of roots) {
        if (root >= 0 && root <= 1) result.push(root);
    }

    return result;
}

function cubicBezierInterceptor(p0, p1, p2, p3) {
    if (arguments.length === 3) {
        p3 = p0[3];
        p2 = p0[2];
        p1 = p0[1];
        p0 = p0[0];
    }
    const cx = 3 * (p1[0] - p0[0]);
    const bx = 3 * (p2[0] - p1[0]) - cx;
    const ax = p3[0] - p0[0] - cx - bx;

    const cy = 3 * (p1[1] - p0[1]);
    const by = 3 * (p2[1] - p1[1]) - cy;
    const ay = p3[1] - p0[1] - cy - by;

    return function (t) {
        const tSquare = t * t;
        const tCubic = tSquare * t;

        // const x = ax * tCubic + bx * tSquare + cx * t + p0[0];
        const y = ay * tCubic + by * tSquare + cy * t + p0[1];

        return y;
    }
}

function simplifiedCubicBezier(p1x, p1y, p2x, p2y) {
    return cubicBezierInterceptor([0, 0], [p1x, p1y], [p2x, p2y], [1, 1]);
}

function cubicBezierGenerator(p1x, p1y, p2x, p2y) {
    const cubicBezier = simplifiedCubicBezier(p1x, p1y, p2x, p2y);
    return function (t) {
        let results = solveCubicBezier(0, p1x, p2x, 1, t);
        if (results.length > 0) return cubicBezier(results[0]);
        return 0;
    };
}
