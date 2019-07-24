import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Navbar from './Navbar'
import Home from './Home'
import RecipePage from './RecipePage'
import Login from './Login'
import User from './User'
import { slugify } from '../helpers'
import recipes from '../sample_data/recipes.json'

const HomeRoute = ({ match }) => {
  console.log(match);
  return(
  <Home
    recipes={recipes.results}
    searchString="ging"
  />
)}
const LoginRoute = () => <Login />
const ProfileRoute = () => <User />
const RecipePageRoute = () => (
  <RecipePage recipes={recipes[0]}/>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar
          searchString=""
          {...this.props}
        />
    
        <div className="container mt-10">
          <Route path="/recipe/recipe" component={RecipePageRoute}/>
          <Route path="/user/login" component={LoginRoute}/>
          <Route path="/user/profile" component={ProfileRoute}/>
          <Route exact path="/" component={HomeRoute}/>
        </div>
      </div>
    )
  }
}

export default App
