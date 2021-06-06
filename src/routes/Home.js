import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import "./Home.css";

class Home extends React.Component {
  // React.component 클래스 기능을 추가한 App 클래스 

  state = {
    isLoading: true,
    moives: [],
  };
  getMovies = async () => {
    // console.log(movies.data.data.movies)
    const {
      data: {
        data: { movies },
      },
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating") // 반환 값을 변수에 저장 
    this.setState({ movies, isLoading: false }); // 키와 변수명이 같을 경우 생략 가능 { movies: movies};
  }
  componentDidMount () {
    this.getMovies();
    // 영화 데이터 로딩!~
  }
  render() {
    const { isLoading,  movies} = this.state;
    return (
      <section className='container'>
        { isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading..</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie 
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              /> 
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
