function solveQuadraticEquation(a: number, b: number, c: number): number[] {
    // Если a = 0, уравнение становится линейным
    if (a === 0) {
        if (b === 0) {
            return c === 0 ? [0] : []; // Бесконечное количество решений или нет решений
        }
        return [-c / b];
    }

    const discriminant = b ** 2 - 4 * a * c;

    if (discriminant < 0) {
        return []; // Нет действительных корней
    }

    if (discriminant === 0) {
        return [-b / (2 * a)]; // Один корень
    }

    const sqrtD = Math.sqrt(discriminant);
    const x1 = (-b + sqrtD) / (2 * a);
    const x2 = (-b - sqrtD) / (2 * a);

    return [x1, x2]; // Два корня
}

console.log(solveQuadraticEquation(1,2,3));