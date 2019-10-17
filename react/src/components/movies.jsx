import React from 'react';
import axios from 'axios';
import Movie from './movie';
import Pagination from './pagination';
import SelectYears from './selectYears';
import jwtDecode from "jwt-decode";
import {toast} from 'react-toastify';
import '../App.css';

//for update a rank use axios.patch
class App extends React.Component {
  state = {
    base_url:"https://api.themoviedb.org/3/discover/movie?api_key=17bd556244a0165b66eac779da66194c&vote_average.gte=5&language=en-US&sort_by=primary_release_date.asc&page=",
    base_img_url: "http://image.tmdb.org/t/p/",
    poster_size: "w154",
    release_year: 2019,
    min_release_date: 2010,
    max_release_date: 2019,
    selected_year: null,
    page: 1,
    total_pages: null,
    movies: null,
    movies_count: null,
    loading: true,
    api_response : null,
    user: null
   }

   async componentDidMount() {
     this.getMovies();

    try {
      const token = localStorage.getItem("JSONWebToken");
      const user = jwtDecode(token);
      this.setState({ user });
    } catch (error) {}

   }

   getMovies = async (url = this.state.base_url+this.state.page+"&primary_release_year="+this.state.release_year) =>{
     delete axios.defaults.headers.common['x-auth-token']; 
     const {data: response} = await axios.get(url);
     this.setState({movies:response.results, movies_count:response.total_results, total_pages:response.total_pages,  loading:false});
      this.showRanks();
     
   }

   showRanks = async () =>{
     try {
      const {data} = await axios.get('http://localhost:9000/api/ranks/users/'+this.state.user.id);
      let {movies} = this.state;
      movies.forEach(function(movie, index) {
       data.data.forEach(function(rank){
         if(rank.movie_id === movie.id){
          movies[index].rank_id = rank.id;
           movies[index].rank_value = rank.value;
         }
       });
     });
     this.setState({movies:movies});
       
     } catch (error) {
       
     }
   }

   handleYears = async(e) =>{
    const year = e.target.value;
    this.setState({release_year: year,loading:true});
    this.getMovies(this.state.base_url+this.state.page+"&primary_release_year="+year);
  }
 
  handlePageChange = page =>{
    if(page === this.state.page) return null;
    this.setState({page: page});
    this.getMovies(this.state.base_url+page+"&primary_release_year="+this.state.release_year);
  }

  handleRating = async rank =>{
    const {value, movie_id} = rank;
    const id = this.state.user.id;
    
    const obj = {value, movie_id, user_id:id};
    try{
      axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("JSONWebToken");
      const { data } = await axios.post('http://localhost:9000/api/ranks', obj);
      toast.success(data.message);
      this.getMovies();
      
    }catch(e){
      toast.error("An error was ocurred.");
      console.log(e);
    }
  }

  removeRating = async id =>{
    try{
      axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("JSONWebToken");
      const { data } = await axios.delete('http://localhost:9000/api/ranks/'+ id);
      toast.warn(data.message);
      this.getMovies();
      
    }catch(e){
      toast.error("An error was ocurred.");
      console.log(e);
    }
  }

  render() {
    const {release_year, min_release_date, max_release_date} = this.state;
    return ( 
      <React.Fragment>
        <SelectYears handleYears={this.handleYears} defaultValue={release_year} min_release_date={min_release_date} max_release_date={max_release_date}/>
        {this.renderPagination()}
        {this.renderMovies()}
        {this.renderPagination()}
      </React.Fragment>
     );
  }

  renderMovies(){
    if(this.state.loading || !this.state.movies || this.state.movies.length === 0) return <div>loading...</div>;

    return this.state.movies.map(movie => (
    <Movie 
      key={movie.id}  
      Movie={movie} 
      base_img_url={this.state.base_img_url} 
      poster_size={this.state.poster_size} 
      handleRating={this.handleRating} 
      removeRating={this.removeRating} 
      showRating={this.state.user ? true : false}
    />
    ));
  }

  renderPagination(){
    const {page, movies_count, total_pages} = this.state;
    return <Pagination itemsCount={movies_count} pageSize="20" onPageChange={this.handlePageChange} currentPage={page} totalPages={total_pages}/>
  }
}
 

export default App;
