$(document).ready(() => {
  $('#tweet-text').on('keydown keyup paste', function() {
    let $counterEl = $(this).parent().find('.counter');
    let charCount = $(this).val().length;
    let newClass

    $counterEl.text(140 - charCount);
    if (140 - charCount < 0) {
      // $counterEl.css('color', 'red');
      $counterEl.addClass('exceedingCharLimit');
    } else {
      $counterEl.removeClass('exceedingCharLimit');
    }
  });
});