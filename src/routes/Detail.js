import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    //await는 async함수안에서만사용가능
    setMovie(json);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div>
          <h1>Detail</h1>
          <img src={movie.data.movie.large_cover_image} />
          <h2>Title : {movie.data.movie.title_long}</h2>
          <strong>rating: {movie.data.movie.rating} </strong>
          <strong>runtime: {movie.data.movie.runtime} </strong>
          <h3>genres</h3>
          <ul>
            {movie.data.movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
