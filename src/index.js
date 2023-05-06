import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Component for the star rating
const Stars = ({ rating, onClick }) => {
  const [hover, setHover] = useState(null);
  
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const filled = (hover || rating) >= i + 1;
        return (
          <span
            key={i}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onClick(i + 1)}
          >
            {filled ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

// Component for a single review
const Review = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

// Component for the form to submit a new review
const ReviewForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Leave a review..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

// Component for a single movie
const Movie = ({ title, image, synopsis, rating, reviews, onRate, onReview }) => {
  const handleSubmitReview = (text) => {
    onReview({ text });
  };

  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt={`${title} poster`} />
      <p>{synopsis}</p>
      <Stars rating={rating} onClick={onRate} />
      <div>
        <h3>Reviews</h3>
        <ReviewList reviews={reviews} />
        <ReviewForm onSubmit={handleSubmitReview} />
      </div>
    </div>
  );
};

// Component for a list of movies
const MovieList = ({ movies, onRate, onReview }) => {
  return (
    <div>
      {movies.map((movie, i) => (
        <Movie
          key={i}
          title={movie.title}
          image={movie.image}
          synopsis={movie.synopsis}
          rating={movie.rating}
          reviews={movie.reviews}
          onRate={(rating) => onRate(i, rating)}
          onReview={(review) => onReview(i, review)}
        />
      ))}
    </div>
  );
};

// Main app component
const App = () => {
  const [movies, setMovies] = useState([
    {
      title: 'The Shawshank Redemption',
      image: 'https://i.imgur.com/DRml5gK.jpg',
      synopsis: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      rating: 4,
      reviews: [],
    },
    {
      title: 'The Godfather',
      image: 'https://i.imgur.com/Uzvny9I.jpg',
      synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      rating: 3,
      reviews: [],
    },
  ]);

  const handleRateMovie = (index, rating) => {
    const newMovies = [...movies];
    newMovies[index].rating = rating;

