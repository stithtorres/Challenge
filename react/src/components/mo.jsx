import React from 'react';
import Rating from 'react-rating';

const Movie = (props) => {
    const movie = props.Movie;
    return (
        <section className="movie-wrapper" key={movie.id}>
            
            {movie.poster_path != null ? (
                <img className="poster" alt={movie.title} src={props.base_img_url+props.poster_size+movie.poster_path} />
            ):(
                <span className="no-poster">No image found in themoviedb</span>
            )}
            
            <h2  className="title">{movie.title}</h2>
            <span className="release-date">Release Date: <b>{movie.release_date}</b></span>
            <p className="overview">{movie.overview}</p>
            <div className="clear"></div>
            <div className="wrapper-rating">
            {movie.rank_id && <span>Your rating <big>(<b>{movie.rank_value}</b>)</big></span> }
            {props.showRating && (
            <Rating 
                
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                initialRating={movie.rank_value}
                onChange={(rate) => props.handleRating({'value':rate,'movie_id':movie.id})} 
                
            />)}
            {movie.rank_id && <button onClick={()=>props.removeRating(movie.rank_id)} type="button" className="btn btn-primary btn-sm">remove rating</button>}
            </div>
            <hr/>
            <div className="footermovie">
                <div className="maxw200">
                <label htmlFor="comment">Make a comment:</label>
                <textarea className="form-control"></textarea>
                <button type="button" className="btn btn-primary btn-block btn-sm">Comment</button>
                </div>
            </div>
        </section>
    );
}
 
export default Movie;