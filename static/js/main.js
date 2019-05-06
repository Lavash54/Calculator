var $keys = $('button');
var $summary = $('.summary');
var $total = $('.total');
var operators = ['+', '-', '*', '/'];

$keys.click(function() {
  var keyValue = $(this).data('val');
  output = $summary.html();
  var lastChar = output[output.length - 1];
  console.log(lastChar);

  if (keyValue == 'clear') {
    $total.html('0');
    $summary.html('');
  } else if (keyValue == '=') {
    if (lastChar == '!') {
      end = factorial($summary.html().substring(0, output.length - 1));
    } else {
      end = calculateString($summary.html());
    }
    $total.html(end);

    if (end != 0) {
      $summary.html(end);
    } else {
      $summary.html('');
    }
  } else if ($(this).is('.operator')) {
    if (output != '' && operators.indexOf(lastChar) == -1) {
      $summary.html($summary.html() + keyValue);
    } else if (output == '' && keyValue == '-') {
      $summary.html($summary.html() + keyValue);
    }
    if (operators.indexOf(lastChar) > -1 && output.length > 1) {
      $summary.html($summary.html().replace(lastChar, keyValue));
    }
  } else if (keyValue == 'factorial') {
    if (lastChar == '!') {
      alert('Данный калькулятор не может вычислять двойной и более факториал');
    } else if (output != '') {
      $summary.html($summary.html() + '!');
    }
  } else if (keyValue == '0') {
    if (output != '0') {
      $summary.html($summary.html() + keyValue);
    }
  } else if (keyValue == 'delete') {

  } else {
    $summary.html($summary.html() + keyValue);
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
    case 67:
      key = 'clear';
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
    default:
      return false;
  }
  $('[data-val="' + key + '"]').addClass('active').click();
}).keyup(function() {
  $('.active').removeClass('active');
});
