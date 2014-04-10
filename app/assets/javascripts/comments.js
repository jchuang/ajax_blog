$(function() {
  $('#new_comment').on('submit', function(event) {
    event.preventDefault();

    // Get the <form> that was submitted
    var $form = $(event.currentTarget);

    // Send a request in the background to the specified URL
    $.ajax({
      // Set the request type to POST
      type: 'POST',

       // Get the URL from the <form> tag (/posts/:id/comments)
      url: $form.attr('action'),

      // Specify the type of data that you're expecting back from the server
      dataType: 'json',

      // Send all the data from the form fields
      data: $form.serialize(),

      // This function will run when the response returned is successful.
      // The body of the response will be passed in as the `response`.
      success: function(response) {
        // Create the HTML/DOM element for the new comment
        var $commentAuthor = $('<h4>').text(response.author);
        var $commentBody = $('<p>').text(response.body);
        var $comment = $('<div>')
          .addClass('comment')
          .append($commentAuthor)
          .append($commentBody);

        // Add the new comment to the comment feed
        var $commentFeed = $('.comment-feed');
        $commentFeed.append($comment);
      },

      // This function will run when the response returned is an error.
      error: function() {
        alert('Something was wrong with your comment. Try again.');
      }
    });
  });
});
