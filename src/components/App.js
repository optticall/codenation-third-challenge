import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom';
import Navbar from './Navbar'
import Home from './Home'
import RecipePage from './RecipePage'
import Login from './Login'
import User from './User'
import { slugify } from '../helpers'
import recipes from '../sample_data/recipes.json'

const findRecipe = (recipeSlug) => {
  return recipes.results.find( recipe => slugify(recipe.title) === recipeSlug) || null;
}

const NavBar = (props) => {
  const searchString = props.location.pathname.indexOf('recipe') > -1 ? true : false;
  return(
  <Navbar 
    searchString={props.match && !searchString ? props.match.params.searchString : '' } {...props} 
  />
)}
  
const HomeRoute = ({ match }) => (
  <Home
    recipes={recipes.results}
    searchString={match.params.searchString}
  />
)
const LoginRoute = (props) => <Login {...props} />

const ProfileRoute = (props) => <User {...props} />

const RecipePageRoute = ({ match }) => (
  <RecipePage recipe={findRecipe(match.params.recipe)}/>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/:searchString" children={NavBar} />
    
        <div className="container mt-10">
          <Route path="/recipe/:recipe" component={RecipePageRoute}/>
          <Route path="/user/login" component={LoginRoute}/>
          <Route path="/user/profile" component={ProfileRoute}/>
          <Route path="/:searchString" component={HomeRoute}/>
          <Route exact path="/" component={HomeRoute}/>
        </div>
      </div>
    )
  }
}

export default withRouter(App);
