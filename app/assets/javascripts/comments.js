$(function() {
  $('#new_comment').on('submit', function(event) {
    event.preventDefault();

    // Comment attributes
    var comment = {
      author: 'Aunty Entity',
      body: 'Welcome, to another edition of Thunderdome!'
    };

    // Create the HTML/DOM element for the new comment
    var $commentAuthor = $('<h4>').text(comment.author);
    var $commentBody = $('<p>').text(comment.body);
    var $comment = $('<div>')
      .addClass('comment')
      .append($commentAuthor)
      .append($commentBody);

    // Add the new comment to the comment feed
    var $commentFeed = $('.comment-feed');
    $commentFeed.append($comment);
  });
});
