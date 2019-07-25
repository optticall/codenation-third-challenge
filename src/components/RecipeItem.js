import React from 'react'
import { slugify } from '../helpers';
import { Link } from 'react-router-dom';

/**
 * Esse método poderia ser criado no helpers.js ou como component, no entanto, 
 * para completar o desafio, e demonstrar a tecnica utilizada, ele foi adicionado aqui, 
 * mas não é o ideal.
 */ 
const highlightedText = (texto, higlight) => {
    const parts = (texto) ? texto.split(new RegExp(`(${higlight})`, 'gi')) : [];
    return <span> { parts.map((part, i) => 
        part.toLowerCase() === higlight.toLowerCase() 
        ? <mark key={i}>{part}</mark> 
        : <span key={i}>{part}</span>    
    )} </span>;
}

const RecipeItem = ({title, ingredients, thumbnail, searchString = ''}) => {
    const link = (title) ? `/recipe/${slugify(title)}` : '/';
    return (
    <div className="col-sm-3 mt-4">
        <Link to={ link }>
            <div className="card">
                <img className="card-img-top img-fluid" src={thumbnail} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{highlightedText(title, searchString)}</h5>
                    <p className="card-text">
                        <strong>Ingredients: </strong>{highlightedText(ingredients, searchString)}
                    </p>
                </div>
            </div>
        </Link>
    </div>
)}

export default RecipeItem;