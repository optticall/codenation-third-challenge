import React from 'react'

/**
 * Esse método poderia ser criada no helpers.js ou como component, no entanto, 
 * para completar o desafio ela foi adicionada aqui, o que não é ideal.
 */ 
const highlightedText = (text, higlight) => {
    let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        part.toLowerCase() === higlight.toLowerCase() 
        ? <mark key={i}>{part}</mark> 
        : <span key={i}>{part}</span>    
    )} </span>;
}

const RecipeItem = ({recipe = {}, searchString = ''}) => (
    <div className="col-sm-3 mt-4">
        <div className="card">
            <img className="card-img-top img-fluid" src={recipe.thumbnail} alt="" />
            <div className="card-body">
                <h5 className="card-title">{highlightedText(recipe.title, searchString)}</h5>
                <p className="card-text">
                    <strong>Ingredients: </strong>{highlightedText(recipe.ingredients, searchString)}
                </p>
            </div>
        </div>
    </div>
)

export default RecipeItem;