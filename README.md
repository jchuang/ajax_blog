# AJAX Blog

In this exercise you will learn how to submit and display comments using jQuery
& AJAX.

## Getting Started

- Fork the [AJAX Blog Repo](https://github.com/LaunchAcademy/ajax_blog/tree/master)
- Clone down your fork of the repo with `git clone git@github.com:<YOUR USERNAME HERE>/ajax_blog.git`
- Set up your database with `rake db:create && rake db:migrate`.
- Seed some posts with `rake db:seed`.
- Take a few minutes to look through the app

## Prevent the Comment Form From Refreshing the Page

The comment form has an id of `#new_comment`. We can use this to bind
to the form's submit event. The code inside our function will run when
the `submit` event is triggered.

The first thing that we will want to do is prevent the form from
actually submitting, which would cause the page to refresh. We can do this using
jQuery's [event.preventDefault()](http://api.jquery.com/event.preventdefault/).

```javascript
// app/assets/javascripts/comments.js

$(function() {
  $('#new_comment').on('submit', function(event) {
    event.preventDefault();
    alert('no more refreshes!')
  });
});
```

[Changes for this step](https://github.com/LaunchAcademy/ajax_blog/commit/93e215c1472a5023cbb3a978629706a6a4c46372)

## Adding Content to the Comment Feed

```javascript
// app/assets/javascripts/comments.js

$(function() {
  $('#new_comment').on('submit', function(event) {
    event.preventDefault();

    var comment = 'Hello World!'

    // Add the new comment to the comment feed
    var $commentFeed = $('.comment-feed');
    $commentFeed.append(comment);
  });
});
```

Our end goal is to be able to add our new comment to the page without having to
refresh the page. We can start working toward that goal by creating a String
that represents a comment. Then we can find the `<div>` that contains all of
the comments by it's class `.comment-feed`. Finally, we can use jQuery's
[.append()](https://api.jquery.com/append/) to append our comment to the
comment feed.

[Changes for this step](https://github.com/LaunchAcademy/ajax_blog/commit/3947804727d456aebcc9b2fa9203bd75f399ec83)

## Create DOM elements for comment

```javascript
// app/assets/javascripts/comments.js

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
```

We want our newly added comments to match the style of the other
comments on the page.

The HTML for the other comments looks something like this:

```html
<div class="comment">
  <h4>Eric</h4>
  <p>Hello world</p>
</div>
```

We can use jQuery to create DOM elements as shown in the sample above.
Instead of appending a string to the comment feed, we can append the
DOM element that we just created onto the page.

[Changes for this step](https://github.com/LaunchAcademy/ajax_blog/commit/b30cb9c3125c117f623d3988a0d391ee2fe89099)

## Create the Comment Asynchronously

Rather than hard coding comment attributes, we want to use jQuery's
[.ajax()](https://api.jquery.com/jQuery.ajax/) function to send a POST
request to `/posts/:id/comments` which includes all of the data in our
form. When the request finishes, either the `success` or the `failure`
callback function will run, depending on the [HTTP status
code](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes) of the
response that the server sends back.

Usually our requests to the server are sending back HTML as the body of
the response. In order to configure the server to send back a
[JSON](http://www.copterlabs.com/blog/json-what-it-is-how-it-works-how-to-use-it/)
hash as the response, you need to change your Rails controller a little bit.
This has already been done for you but you should go check out the
`CommentsController` to see how it works.

```javascript
// app/assets/javascripts/comments.js

$(function() {
  $('#new_comment').on('submit', function(event) {
    event.preventDefault();

    // Comment attributes
    var comment = {
      author: 'Aunty Entity',
      body: 'Welcome, to another edition of Thunderdome!'
    };

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
        alert('hurray');
      },

      // This function will run when the response returned is an error.
      error: function() {
        alert('Something was wrong with your comment. Try again.');
      }
    });

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
```

[Changes for this step](https://github.com/LaunchAcademy/ajax_blog/commit/ab2e8022a7b8a4e4829cca06453776c3b511d078)

## Check Out the Response

Swap our the alert in the `success` callback with a `debugger;` statement.
This works like pry in Ruby does. The only trick is that you need to have the
JavaScript Console open when you submit the comment form.

```javascript
// app/assets/javascripts/comments.js

// This function will run when the response returned is successful.
// The body of the response will be passed in as the `response`.
success: function(response) {
  debugger;
},
```

> Hint: You can open the JavaScript Console with `cmd + option + J`.

Try creating a comment with the JavaScript Console open. Once you're in the
debugging session, type `response` into the JavaScript Console to see the value
of the response that was returned from the server.

It looks like our hard coded JSON object!

[Changes for this step](https://github.com/LaunchAcademy/ajax_blog/commit/4b5d8a1f92a7c321207da75f32582b0188305ae0)

## Adding the Real Comment Onto the Page

Since the `response` is a JSON hash that represents the comment created
in the database, we can use this in place of our hard coded comment
attributes object. The easiest way to do this is to move all of the
code responsible for adding the comment to the page into the `success`
callback.

```javascript
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
```

[Changes for this step](https://github.com/LaunchAcademy/ajax_blog/commit/4f175469831246e434c2170649427ae13f0ecf64)

**HURRAY! You've built your first feature with AJAX.**
