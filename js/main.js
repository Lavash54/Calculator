var $keys = $('button');
var $summary = $('.summary');
var $total = $('.total');
var decimal = false;
var operators = ['+', '-', '*', '/'];
var numbers = '1234567890';
var calc = ['cos', 'sin', 'tan', 'log', 'sqrt', 'pow'];
var countBracket = 0;
var numberFirstPow = 0;
var numberSecondPow = 0;

$keys.click(function() {
  var keyValue = $(this).data('val');
  output = $summary.html();
  var lastChar = output[output.length - 1];

  if (output == 'Infinity') {
    $summary.html('');
    $total.html('0');
  }

  var trig = 'cos';
  var sqrt = 'sqrt';
  var pow = 'pow';

  if (keyValue == 'clear') {
    $total.html('0');
    $summary.html('');
    decimal = false;
    countBracket = 0;
  } else if (keyValue == 'delete') {
    if (lastChar == ')') {
      countBracket++;
    } else if (lastChar == '(') {
      countBracket--;
    }
    del = output.substring(0, output.length - 1);
    $summary.html(del);
  } else if (keyValue == '%') {
    output = outputTrig(output);
    var string = '';
    var variable;
    if (numbers.indexOf(lastChar) > -1) {
      for (var i = output.length - 1; i >= 0; i--) { // Получения числа до %
        if (operators.indexOf(output[i]) <= -1) {
          string += output[i];
          variable = i;
        } else {
          break;
        }
      }
      string = reverseString(string); // Переворачиваем строку
      console.log(string);
      end = calculateString(string) / 100;
      start = calculateString(output.substring(0, variable) + '' + end);
      $summary.html(start);
      $total.html($summary.html());
    } else {
      full = calculateString(output) / 100;
      $summary.html(full);
      $total.html($summary.html());
    }
    decimal = false;
  } else if (keyValue == '=') {
    for (var i = 0; i < output.length; i++) { // Получение степени числа
      if (output.indexOf('^') > -1 && operators.indexOf(output[i]) <= -1) {
        numberSecondPow += output[i];
        if (output[i] == '^') {
          numberSecondPow = '';
        }
      } else {
        break;
      }
    }
    if (lastChar == '!') { // Факториал
      end = factorial(output.substring(0, output.length - 1));
    } else if (calc.indexOf(trig) > -1 || calc.indexOf(sqrt) > -1 ||
      calc.indexOf(pow) > -1) { // Квадрат, корень, тригонометрия
      output = outputTrig(output);
      end = calculateString(output);
    } else { // Числа
      end = calculateString($summary.html());
    }
    $total.html(end);

    if (end != 0) {
      $summary.html(end);
      numberFirstPow = end;
    } else {
      $summary.html('');
    }
    decimal = false;
  } else if ($(this).is('.operator')) { // Операторы
    if (lastChar == '.') {
      $summary.html($summary.html());
    } else if (lastChar == '(') {
      $summary.html($summary.html());
    } else if (output != '' && operators.indexOf(lastChar) == -1) {
      $summary.html($summary.html() + keyValue);
    } else if (output == '' && keyValue == '-') {
      $summary.html($summary.html() + keyValue);
    }
    if (operators.indexOf(lastChar) > -1 && output.length > 1) {
      $summary.html($summary.html().replace(lastChar, keyValue));
    }
    decimal = false;
  } else if (keyValue == 'factorial') {
    if (lastChar == '!') {
      alert('Данный калькулятор не может вычислять двойной и более факториал');
      return -1;
    } else if (output != '') {
      $summary.html($summary.html() + '!');
    }
    decimal = false;
  } else if (keyValue == '0') {
    if (output != '0') {
      $summary.html($summary.html() + keyValue);
    }
  } else if (keyValue == ')') {
    if (operators.indexOf(lastChar) > -1) {
    } else if (countBracket > 0) {
      $summary.html($summary.html() + keyValue);
      countBracket--;
    }
  } else if (keyValue == '(') {
    if (numbers.indexOf(lastChar) == -1) {
      $summary.html($summary.html() + keyValue);
    } else {
      $summary.html($summary.html() + '*' + keyValue);
    }
    countBracket++;
  } else if (keyValue == '.') {
    if (output == '') { // Если ничего, ставим ноль перед точкой
      $summary.html('0' + keyValue);
    } else if (operators.indexOf(lastChar) > -1) { // Если последний символ Оператор, ставим ноль перед точкой
      $summary.html($summary.html() + '0' + keyValue);
    } else if (lastChar == '.' || lastChar == '(' || lastChar == ')') {

    } else {
      if (!decimal) { // Не даем пользователю выставить к примеру такое число - "0.00111.11"
        $summary.html($summary.html() + keyValue);
        decimal = true;
      }
    }
  } else if (keyValue == 'e' || keyValue == 'π') {
    if (lastChar == 'e' || lastChar == 'π') {
      $summary.html($summary.html() + '*' + keyValue);
    } else if (numbers.indexOf(lastChar) == -1) {
      $summary.html($summary.html() + keyValue);
    } else {
      $summary.html($summary.html() + '*' + keyValue);
    }

  } else if (keyValue == 'cos(' || keyValue == 'sin(' ||
    keyValue == 'log(' || keyValue == 'tan(' || keyValue == 'sqrt(') {
    if (lastChar == ')' || numbers.indexOf(lastChar) > -1) { // Если перед ними стоит закрывающая стобка или цифра - ставить знак умножения
      $summary.html($summary.html() + '*' + keyValue);
    } else {
      $summary.html($summary.html() + keyValue);
    }
    countBracket++;
  } else if (keyValue == '^') {
    if (numbers.indexOf(lastChar) > -1) { // Получения числа, которое нужно возвести в квадрат
      output = outputTrig(output);
      var string = '';
      var variable;
      for (var i = output.length - 1; i >= 0; i--) {
        if (operators.indexOf(output[i]) <= -1) {
          string += output[i];
          variable = i;
        } else {
          break;
        }
      }
      numberFirstPow = reverseString(string);
      $summary.html($summary.html() + keyValue);
    }
  } else {
    if (lastChar == ')') {
      $summary.html($summary.html() + '*' + keyValue);
    } else if (lastChar == '0') {
      if (output[output.length - 2] == '(') {
        $summary.html($summary.html().replace(lastChar, keyValue));
      } else {
        $summary.html($summary.html() + keyValue);
      }
    } else if (lastChar == 'e' || lastChar == 'π') {
      $summary.html($summary.html() + '*' + keyValue);
    } else {
      $summary.html($summary.html() + keyValue);
    }
  }
});

function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

function reverseString(str) {
  var newString = '';
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

function calculateString(str) {
  return (new Function('return ' + str))();
}

function outputTrig(output) {
  output = output
    .replace(numberFirstPow + '^' + numberSecondPow, 'Math.pow(' + numberFirstPow + ',' + numberSecondPow + ')')
    .replace(/sqrt/g, 'Math.sqrt')
    .replace(/cos/g, 'Math.cos')
    .replace(/sin/g, 'Math.sin')
    .replace(/log/g, 'Math.log')
    .replace(/tan/g, 'Math.tan')
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E');

  return output;
}

$(window).keydown(function(e) {
  console.log(e.which);
  switch (e.which) {
    case 8:
      key = 'delete';
      break;
    case 48:
      key = 0;
      break;
    case 49:
      key = 1;
      break;
    case 50:
      key = 2;
      break;
    case 51:
      key = 3;
      break;
    case 52:
      key = 4;
      break;
    case 53:
      key = 5;
      break;
    case 54:
      key = 6;
      break;
    case 55:
      key = 7;
      break;
    case 56:
      key = 8;
      break;
    case 57:
      key = 9;
      break;

    case 191:
      key = '/';
      break;
    case 190:
      key = '.';
      break;
    case 88:
      key = '*';
      break;
    case 189:
      key = '-';
      break;
    case 187:
      key = '+';
      break;

    case 96:
      key = 0;
      break;
    case 97:
      key = 1;
      break;
    case 98:
      key = 2;
      break;
    case 99:
      key = 3;
      break;
    case 100:
      key = 4;
      break;
    case 101:
      key = 5;
      break;
    case 102:
      key = 6;
      break;
    case 103:
      key = 7;
      break;
    case 104:
      key = 8;
      break;
    case 105:
      key = 9;
      break;

    case 111:
      key = '/';
      break;
    case 109:
      key = '-';
      break;
    case 106:
      key = '*';
      break;
    case 107:
      key = '+';
      break;
    case 13:
      key = '=';
      break;
    case 110:
      key = '.';
      break;
    case 27:
      key = 'clear';
      break;
    case 67:
      key = 'cos(';
      break;
    case 83:
      key = 'sin(';
      break;
    case 84:
      key = 'tan(';
      break;
    case 76:
      key = 'log(';
      break;
    default:
      return false;
  }
  $('[data-val="' + key + '"]').addClass('active').click();
}).keyup(function() {
  $('.active').removeClass('active');
});
