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
  } else if (keyValue == 'delete') {
    if (lastChar == ')') {
      countBracket++;
    } else if (lastChar == '(') {
      countBracket--;
    }
    del = output.substring(0, output.length - 1);
    $summary.html(del);
  } else if (keyValue == '%') { // Немного не то !!!
    if (numbers.indexOf(lastChar) > -1) {
      end = calculateString(output);
      $summary.html(end / 100);
      $total.html($summary.html());
    }
  } else if (keyValue == '=') {
    if (lastChar == '!') {
      end = factorial(output.substring(0, output.length - 1));
    } else if (calc.indexOf(trig) > -1 || calc.indexOf(sqrt) > -1 ||
      calc.indexOf(pow) > -1) {
      output = output
        .replace(numberFirstPow + '^' + numberSecondPow, 'Math.pow(' + numberFirstPow + ',' + numberSecondPow + ')')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/cos/g, 'Math.cos')
        .replace(/sin/g, 'Math.sin')
        .replace(/log/g, 'Math.log')
        .replace(/tan/g, 'Math.tan');
      end = calculateString(output);
    } else {
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
  } else if ($(this).is('.operator')) {
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
    if (output == '') {
      $summary.html('0' + keyValue);
    } else if (operators.indexOf(lastChar) > -1) {
      $summary.html($summary.html() + '0' + keyValue);
    } else if (lastChar == '.') {

    } else {
      if (!decimal) {
        $summary.html($summary.html() + keyValue);
        decimal = true;
      }
    }
  } else if (keyValue == 'cos(' || keyValue == 'sin(' ||
    keyValue == 'log(' || keyValue == 'tan(' || keyValue == 'sqrt(') {
    if (lastChar == ')' || numbers.indexOf(lastChar) > -1) {
      $summary.html($summary.html() + '*' + keyValue);
    } else {
      $summary.html($summary.html() + keyValue);
    }
    countBracket++;
  } else if (keyValue == '^') {
    numberFirstPow = lastChar; // Всего один символ
    $summary.html($summary.html() + keyValue);
  } else {
    if (lastChar == ')') {
      $summary.html($summary.html() + '*' + keyValue);
    } else if (lastChar == '^') {
      numberSecondPow = keyValue; // Всего один символ
      $summary.html($summary.html() + keyValue);
    } else if (lastChar == '0') {
      $summary.html(keyValue);
    } else {
      $summary.html($summary.html() + keyValue);
    }
  }
});

function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

function calculateString(str) {
  return (new Function('return ' + str))();
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
