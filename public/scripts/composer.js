$(document).ready(function() {
  // Show scroll button on scroll
  $(window).scroll(() => {
    if ($(window).scrollTop() === 0) {
      $('#scroll-button').hide();
      $('#compose-button').show();
    } else {
      $('#scroll-button').show();
      $('#compose-button').hide();
    }
  });

  // Scroll to top and focus on new tweet input area when scroll button clicked
  $('#scroll-button').click(() => {
    $('.new-tweet').show();
    $('textarea').focus();

    $(document).scrollTop('.new-tweet');
  });
});