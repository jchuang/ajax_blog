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
        var $commentAuthor = $('<h4>').text(comment.author);
        var $commentBody = $('<p>').text(comment.body);
        var $comment = $('<div>')
          .addClass('comment')
          .append($commentAuthor)
          .append($commentBody);

        var $commentFeed = $('.comment-feed');
        $commentFeed.append(comment);
      },
      error: function() {
        alert('Something was wrong with your comment. Please try again.')
      }
    });
  });
});
