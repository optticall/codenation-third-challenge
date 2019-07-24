import React from 'react'
import PropTypes from 'prop-types'
import RecipeItem from './RecipeItem'

const Home = ({
    recipes = [],
    searchString = ''
}) => {
    return (
    <div className="row">
        { recipes.map( (recipe, index) => 
            <RecipeItem 
                key={index} 
                searchString={searchString} 
                recipe={recipe} 
            />   
        )}
    </div>
)}

Home.propTypes = {
    searchString: PropTypes.string,
    recipes: PropTypes.array
}

export default Home
