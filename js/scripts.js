

$(function() {

    var $bookList = $('#books');
    $.ajax({
        url: 'http://127.0.0.1:8000/book/',
        method: 'GET'
    }).done(function(response) {
        for(var i= 0; i < response.length; i++) {
            var $li = $('<li data-id="' + response[i].id + '">');
            $li.text(response[i].title);
            var $div = $('<div class="description hidden">');
            var $del = $('<a href="#" class="del" style="margin-left: 10px">');
            $del.text('Usuń');
            $bookList.append($li);
            $li.append($del);
            $div.insertAfter($li);


            $del.on('click', function(event) {
                var $id = $(this).parent().data('id');
                $.ajax({
                    url: 'http://127.0.0.1:8000/book/' + $id,
                    method: 'DELETE',
                    data: 'pk="' + $id +'"'
                }).done(function() {
                    location.reload();
                    alert('Książka usunięta');
                });

            });
        }


    });


        $bookList.on('click', 'li', function(event) {
            var id = $(this).attr('data-id');
            var $desc = $(this).next();
            $desc.toggleClass('hidden');

            $.ajax({
                url: 'http://127.0.0.1:8000/book/' + id,
                method: 'GET'
            }).done(function(response) {
                var $details = '<p><b>Autor:</b> ' + response.author + '</p>' +
                               '<p><b>Gatunek:</b> ' + response.genre + '</p>' +
                               '<p><b>Wydawca:</b> ' + response.publisher + '</p>' +
                               '<p><b>ISBN:</b> ' + response.isbn + '</p>';
                $desc.html($details);

            })
        });

    var $form = $('form');
    var $btn = $('button');
    $btn.on('click', function(event) {
        event.preventDefault();

        var formData = {
            author: $form.find('#author').val(),
            genre: $form.find('#genre').val(),
            isbn: $form.find('#isbn').val(),
            publisher: $form.find('#publisher').val(),
            title: $form.find('#title').val()
        };

        $.ajax({
            url: 'http://127.0.0.1:8000/book/',
            method: 'POST',
            data: formData,
            dataType: 'json'
        }).done(function(response) {
            alert("Książka dodana");
            location.reload();           //przeładowanie strony

        })

    });
    
});