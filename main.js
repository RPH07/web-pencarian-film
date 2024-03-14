$(document).ready(function() {
    // Variabel untuk menyimpan api key
    var apiKey = 'b97194c3';
    
    // jQuery Events 
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#searchTerm').val();
        $('#movies').hide();
        $('.loading-icon').show();
        searchMovies(searchTerm);
    });
    
    // Fungsi untuk mencari film dari api
    function searchMovies(searchTerm) {
        var url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
        
        $.ajax({
            url: url,
            method: 'GET',
            success: function(response) {
                setTimeout(() => {
                    $('.loading-icon').hide();
                    if (response.Response === 'True') {
                        displayMovies(response.Search);
                    } else {
                        $('#movies').empty();
                        alert(`Anda mencari film "${searchTerm}", Sayangnya film tersebut tidak ada.`);
                    }
                }, 1200);
            },
            error: function(error) {
                console.log(error);
                $('#error-message').text('Telah terjadi kesalahan dalam memproses data, harap coba lagi nanti.');
            }
        });
    }
    
    // jQuery + DOM untuk memasuki konten dari api
    function displayMovies(movies) {
        var movieList = $('#movies');
        movieList.empty();
        
        $.each(movies, function(index, movie) {
            var movieItem = $('<div class="movie">');
            movieItem.append(`<h3>${movie.Title}</h3>`);
            movieItem.append(`<p>${movie.Year}</p>`);
            movieItem.append(`<img src="${movie.Poster}">`);
            movieList.append(movieItem);
        });
        // Menampilkan daftar film setelah berhasil dimuat
        movieList.show();
    }
});
