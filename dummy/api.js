let api_key = "38f2cc376208d37fec1e1dbaa6c3ae29";

let img_url = "https://image.tmdb.org/t/p/w300/img.jpg";
let original_img_url = "https://image.tmdb.org/t/p/original";
let genres_list_http =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US";
let movie_genres_http =
  "https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
let movie_detail_http =
  "https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US";
let movie_popular_http =
  "https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1";
let movie_video_http =
  "https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US";
let movie_latest_http =
  "https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US";
