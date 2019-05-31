describe("Возведение в степень", function() {

  describe("возводит x в степень n", function() {

    function makeTest(x) {
      var expected = x * x * x;
      it("при возведении " + x + " в степень 3 результат: " + expected, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (var x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  describe("любое число, кроме нуля, в степени 0 равно 1", function() {

    function makeTest(x) {
      it("при возведении " + x + " в степень 0 результат: 1", function() {
        assert.equal(pow(x, 0), 1);
      });
    }

    for (var x = -5; x <= 5; x += 2) {
      makeTest(x);
    }

  });

  it("ноль в нулевой степени даёт 1", function() {
    assert.equal(pow(0, 0), 1);
  });

});

describe("Сложение", function() {

  describe("суммирование положительных чисел", function() {
    function makeTest(x, y) {
      var result = x + y;
      it("при сложении " + x + " и " + y + " результат: " + result , function() {
        assert.equal(sum(x, y), result);
      });
    }

    for (var x = 5; x <= 20; x += 3) {
      makeTest(x, x + 2);
    }
  });

  describe("суммирование отрицательных чисел", function() {
    function makeTest(x, y) {
      var result = x + y;
      it("при сложении " + x + " и " + y + " результат: " + result , function() {
        assert.equal(sum(x, y), result);
      });
    }

    for (var x = -20; x <= -10; x += 3) {
      makeTest(x, x + 2);
    }
  });

});

describe("Умножение", function() {

  describe("умножение положительных чисел", function() {
    function makeTest(x, y) {
      var result = x * y;
      it("при умножении " + x + " и " + y + " результат: " + result , function() {
        assert.equal(multiplication(x, y), result);
      });
    }

    for (var x = 3; x <= 10; x += 2) {
      makeTest(x, x + 1);
    }
  });

  describe("умножение отрицательных чисел", function() {
    function makeTest(x, y) {
      var result = x * y;
      it("при умножении " + x + " и " + y + " результат: " + result , function() {
        assert.equal(multiplication(x, y), result);
      });
    }

    for (var x = -10; x <= 0; x += 2) {
      makeTest(x, x + 1);
    }
  });

});

describe("Вычитание", function() {

  describe("вычитание положительных чисел", function() {
    function makeTest(x, y) {
      var result = y - x;
      it("при вычитании " + x + " из " + y + " результат: " + result , function() {
        assert.equal(subtraction(y, x), result);
      });
    }

    for (var x = 3; x <= 10; x += 2) {
      makeTest(x, x + 1);
    }
  });

});

describe("Деление", function() {

  describe("деление положительных чисел", function() {
    function makeTest(x, y) {
      var result = x / y;
      it("при делении " + x + " на " + y + " результат: " + result , function() {
        assert.equal(division(x, y), result);
      });
    }

    for (var x = 10; x <= 25; x += 5) {
      makeTest(x, x - 5);
    }
  });

});

describe("Подкоренное выражение", function() {

  describe("положительное число под корнем", function() {
    function makeTest(x) {
      var result = Math.sqrt(x);
      it("число " + x + " под корнем равен: " + result , function() {
        assert.equal(sqrt1(x), result);
      });
    }

    for (var x = 4; x <= 512; x *= 2) {
      makeTest(x);
    }
  });

});

describe("Факториал", function() {

  describe("вычисление факториала числа", function() {
    function makeTest(x) {
      var result = factorial(x);
      it("факториал " + x + " равен: " + result , function() {
        assert.equal(factorials(x), result);
      });
    }

    for (var x = 3; x <= 10; x += 2) {
      makeTest(x);
    }

    function factorial(x) {
      return x ? x * factorial(x - 1) : 1;
    }
  });

});
