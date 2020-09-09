$(document).ready(() => {
  $('#tweet-text').on('keydown keyup paste', function() {
    const $counterEl = $(this).parent().find('.counter');
    const charCount = $(this).val().length;

    $counterEl.text(140 - charCount);
    if (140 - charCount < 0) {
      $counterEl.addClass('exceedingCharLimit');
    } else {
      $counterEl.removeClass('exceedingCharLimit');
    }
  });
});
