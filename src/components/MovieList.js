import {
  calculateProgressBar,
  handleCarouselClick,
  throttle,
} from "../utils/Carousel";
import MovieCard from "./MovieCard";
import { useEffect } from "react";

const MovieList = ({ title, movies }) => {

  useEffect(() => {
    const throttleProgressBar = throttle(() => {
      document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);
    }, 250);
    document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);

    window.addEventListener("resize", throttleProgressBar);

    return () => {
      window.removeEventListener("resize", throttleProgressBar);
    };
  }, []);

  return (
    <div className="md:my-10 row">
      <div className="header-container">
        <p className="text-white font-bold title">{title}</p>
        <div className="progress-bar"></div>
      </div>
      <div className="movie-container">
        <button className="handle left-handle" onClick={handleCarouselClick}>
          <div className="text">&#8249;</div>
        </button>
        <div className="slider">
          {movies &&
            movies.results.map((movie) => (
              <MovieCard key={movie.id} poster={movie.poster_path} />
            ))}
        </div>
        <button className="handle right-handle" onClick={handleCarouselClick}>
          <div className="text">&#8250;</div>
        </button>
      </div>
    </div>
  );
};

export default MovieList;
