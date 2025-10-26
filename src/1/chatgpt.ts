/**
 * Решает квадратное уравнение ax² + bx + c = 0
 * через дискриминант D = b² - 4ac
 * @param a Коэффициент при x²
 * @param b Коэффициент при x
 * @param c Свободный член
 * @returns Массив корней (один, два или пустой)
 */
function solveQuadratic(a: number, b: number, c: number): number[] {
  if (a === 0) {
    // Уравнение линейное: bx + c = 0
    return b !== 0 ? [-c / b] : [];
  }

  const D = b * b - 4 * a * c;

  if (D > 0) {
    const x1 = (-b + Math.sqrt(D)) / (2 * a);
    const x2 = (-b - Math.sqrt(D)) / (2 * a);
    return [x1, x2];
  } else if (D === 0) {
    const x = -b / (2 * a);
    return [x];
  } else {
    // Нет действительных корней
    return [];
  }
}

// Пример использования
console.log(solveQuadratic(1, -3, 2)); // [2, 1]
console.log(solveQuadratic(1, 2, 1));  // [-1]
console.log(solveQuadratic(1, 0, 1));  // []
