/**
 * Функция для решения квадратного уравнения ax² + bx + c = 0
 * @param a коэффициент при x²
 * @param b коэффициент при x
 * @param c свободный член
 * @returns массив с корнями уравнения или сообщение об ошибке
 */
function solveQuadraticAlice(a: number, b: number, c: number): number[] | string {
    // Проверяем, что коэффициент a не равен нулю
    if (a === 0) {
        return 'Ошибка: коэффициент a не может быть равен нулю';
    }

    // Вычисляем дискриминант
    const discriminant = b * b - 4 * a * c;

    // Анализируем значение дискриминанта
    if (discriminant > 0) {
        // Два различных корня
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return [x1, x2];
    } else if (discriminant === 0) {
        // Один корень
        const x = -b / (2 * a);
        return [x];
    } else {
        // Комплексные корни
        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
        return [
            `${realPart} + ${imaginaryPart}i`,
            `${realPart} - ${imaginaryPart}i`
        ];
    }
}

// Примеры использования:
console.log(solveQuadraticAlice(1, -5, 6));  // [3, 2]
console.log(solveQuadraticAlice(1, -2, 1));  // [1]
console.log(solveQuadraticAlice(1, 2, 5));   // ["-1 + 2i", "-1 - 2i"]
console.log(solveQuadraticAlice(0, 2, 1));   // Ошибка: коэффициент a не может быть равен нулю
