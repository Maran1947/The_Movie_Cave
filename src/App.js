import './App.css';
import Nav from './component/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchMovies from './component/SearchMovies';
import Home from './component/Home';

function App() {

  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/search-movies" component={SearchMovies} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
