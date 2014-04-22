$(function() {
  $('#new_comment').on('submit', function(event) {
    event.preventDefault();

    var comment = {
      author: 'kittens everywhere',
      body: 'meow!'
    };

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
