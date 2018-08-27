$(function(){
       function ajax1() {
        $.ajax({
        url: 'http://date.jsontest.com',
        method: 'GET'
    }).done(function(response) {
        console.log('response:', response.date)
    })
    }
    ajax1();

    function toUpper(films) {
        // console.log(films);
        var $film_list = $('#films');

        for(var i=0;i<films.length;i++) {
            // var $el = $('<li>' + films[i].toUpperCase() + '</li>');

            var $el = $('<li><a href="' + films[i] + '">' + films[i].toUpperCase() + '</a></li>');
            $film_list.append($el);

        }
    }
    function ajax2() {
        $.ajax({
        url: 'https://swapi.co/api/people/4/',
        method: 'GET'
    }).done(function(response) {
        toUpper(response.films);
    });
    }
    ajax2();
});