import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pokedex from '../pages/pokedex';
import PokemonDetail from '../pages/pokemon-detail';
/**
 * React App component. It manage de main route definitions
 * @returns
 */
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/pokemon/:name">
          <PokemonDetail />
        </Route>
        <Route path="/">
          <Pokedex />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
