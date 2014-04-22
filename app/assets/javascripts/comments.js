$(function() {
  $('#new_comment').on('submit', function(event) {
    event.preventDefault();

    var comment = {
      author: 'kittens everywhere',
      body: 'meow!'
    };

    var $form = $(event.currentTarget);

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      dataType: 'json',
      data: $form.serialize(),
      success: function(response) {
        alert('yay!');
      },
      error: function() {
        alert('oops, something was wrong with your comment.')
      }
    });

    var $commentAuthor = $('<h4>').text(comment.author);
    var $commentBody = $('<p>').text(comment.body);
    var $comment = $('<div>')
      .addClass('comment')
      .append($commentAuthor)
      .append($commentBody);

    var $commentFeed = $('.comment-feed');
    $commentFeed.append(comment);
  });
});
