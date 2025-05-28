const container = document.getElementById("movie-container");

const fetchMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjU0YzkxYzg3YTA3MjRmYzVkOTlmMmI5OTNiNDAzZCIsIm5iZiI6MTc0ODMyMTQ2Ni45OTMsInN1YiI6IjY4MzU0NGJhMWQ5Yzc5NzgzNmE4NzEyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VpnKUZlC8jlEWZx2MfhVVMfXBhfopJQZQE_IYc4UGes",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP 오류 발생: ${response.status}`);
    }

    const data = await response.json();
    data.results.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "movie_card";
      // TMDB API에서 제공하는 poster_path는 이미지의 파일으 상대 경로 포함("/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg")
      card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie_info">
          <div class="movie_vote_average">⭐️ ${movie.vote_average}</div>
          <div class="movie_title">${movie.title}</div>
          <div class="movie_date">${movie.release_date}</div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("에러 발생:", error);
  }
};

fetchMovies();
