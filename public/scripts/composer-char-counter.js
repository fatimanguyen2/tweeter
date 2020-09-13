$(document).ready(() => {
  $('#tweet-text').on('keydown keyup paste', function() {
    const $counterEl = $(this).parent().find('.counter');
    const charCount = $(this).val().length;
    
    countChar($counterEl, 140, charCount);
    changeTextRed($counterEl, 140 - charCount < 0);
  });
});
