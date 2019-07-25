import React from 'react'
import PropTypes from 'prop-types'
import RecipeItem from './RecipeItem'

const Home = ({
    recipes = [],
    searchString = ''
}) => {

    recipes = (searchString !== "") ? filtrar(searchString) : recipes;

    function filtrar(searchString) {
        return recipes.filter( recipe => 
          recipe.title.toLowerCase().indexOf(searchString.toLowerCase()) > -1 || 
          recipe.ingredients.toLowerCase().indexOf(searchString.toLowerCase()) > -1 )
    }

    return (
    <div className="row">
        { recipes.map( (recipe, index) => 
            <RecipeItem 
                key={index} 
                searchString={searchString} 
                {...recipe} 
            />   
        )}
    </div>
)}

Home.propTypes = {
    searchString: PropTypes.string,
    recipes: PropTypes.array
}

export default Home
