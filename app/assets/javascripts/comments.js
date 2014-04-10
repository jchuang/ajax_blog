$(function() {
  $('#new_comment').on('submit', function(event) {
    event.preventDefault();

    var comment = 'Hello World!'

    // Add the new comment to the comment feed
    var $commentFeed = $('.comment-feed');
    $commentFeed.append(comment);
  });
});
