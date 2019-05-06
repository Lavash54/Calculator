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
    var end = calculateString($summary.html());
    $total.html(end);
    $summary.html(end);
  } else if ($(this).is('.operator')) {
    if (output != '' && operators.indexOf(lastChar) == -1) {
      $summary.html($summary.html() + keyValue);
    } else if (output == '' && keyValue == '-') {
      $summary.html($summary.html() + keyValue);
    }
    if (operators.indexOf(lastChar) > -1 && output.length > 1) {
      $summary.html($summary.html().replace(lastChar, keyValue));
    }
  } else {
    $summary.html($summary.html() + keyValue);
  }
});

function calculateString(str) {
  return (new Function('return ' + str))();
}
