$(document).ready(function() {
  $('.removeBook').on('click', function(e) {
    var deleteId = $(this).data('id');
    $.ajax({
      url: '/manage/books/delete/' + deleteId,
      type: 'DELETE',
      success: function() {
        console.log('Book was removed!');
      }
    });
    window.location = '/manage/books';
  });
});
