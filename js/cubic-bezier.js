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
        return [
            (-b + Math.sqrt(discriminant)) / (2 * a),
            (-b - Math.sqrt(discriminant)) / (2 * a)
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

    if (p === 0) {
        return [Math.pow(-q, 1 / 3)];
    } else if (q === 0) {
        return [Math.sqrt(-p), -Math.sqrt(-p)];
    } else {
        const discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);
        if (discriminant === 0) {
            return [Math.pow(q / 2, 1 / 3) - b / 3];
        } else if (discriminant > 0) {
            return [Math.pow(-(q / 2) + Math.sqrt(discriminant), 1 / 3) - Math.pow((q / 2) + Math.sqrt(discriminant), 1 / 3) - b / 3];
        } else {
            const r = Math.sqrt(Math.pow(-(p / 3), 3));
            const phi = Math.acos(-(q / (2 * Math.sqrt(Math.pow(-(p / 3), 3)))));
            const s = 2 * Math.pow(r, 1 / 3);
            return [
                s * Math.cos(phi / 3) - b / 3,
                s * Math.cos((phi + 2 * Math.PI) / 3) - b / 3,
                s * Math.cos((phi + 4 * Math.PI) / 3) - b / 3
            ];

        }

    }
}

function roundToDecimal(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
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

    const roots = solveCubicEquation(
        p3 - 3 * p2 + 3 * p1 - p0,
        3 * p2 - 6 * p1 + 3 * p0,
        3 * p1 - 3 * p0,
        p0
    );

    const result = [];
    let root;
    for (let i = 0; i < roots.length; i++) {
        root = roundToDecimal(roots[i], 15);
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

        const x = ax * tCubic + bx * tSquare + cx * t + p0[0];
        const y = ay * tCubic + by * tSquare + cy * t + p0[1];

        return [x, y];
    }
}

function simplifiedCubicBezier(p1x, p1y, p2x, p2y) {
    return cubicBezierInterceptor([0, 0], [p1x, p1y], [p2x, p2y], [1, 1]);
}

function cubicBezierGenerator(p1x, p1y, p2x, p2y) {
    const cubicBezier = simplifiedCubicBezier(p1x, p1y, p2x, p2y);
    return function (t) {
        let results = solveCubicBezier(0, p1x, p2x, 1, t);
        for (let i = 0; i < results.length; i++) {
            let temp = results[i];
            if (temp >= 0 && temp <= 1) {
                return cubicBezier(temp)[1];
            }
        }
        return 0;
    };
}