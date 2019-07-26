import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  commentsService from '../services/commentsService';
import { slugify } from '../helpers';
import { getUser } from '../services/loginService';

class CommentsBlock extends Component {
    state = {
        comments: [],
        newComment: '',
        error: ''
    }

    componentWillMount = () => {
        const comments = this.props.recipe 
            ? commentsService.get(slugify(this.props.recipe.title))
            : '';
        this.setState({
            comments: [ ...comments ],
            newComment: ''
        })
    }

    hadleSubmit = e => {
        e.preventDefault();

        if(this.state.newComment === '')
            return this.setState({ error: "Comment can not be Empty" })

        try {
            commentsService.insert(slugify(this.props.recipe.title), this.state.newComment)           
            this.componentWillMount();
        } catch (err){
            this.setState({ error: err.message });
        }
    }

    handleDelete = (commentToDelete) => {
        try{
            commentsService.delete(slugify(this.props.recipe.title), commentToDelete);
            this.componentWillMount();
        } catch (err){
            this.setState({ error: err.message });
        } 
    }

    renderComment = (comment) => (
        <div className="Comment media text-muted pt-3">
            <FontAwesomeIcon className="mr-2" size="3x" icon="user-circle"/>
            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong className="d-block text-gray-dark">@{comment.author}</strong>
                {comment.text}
            </p>
            { getUser().username === comment.author 
                ? <FontAwesomeIcon icon="trash" type="button" onClick={() => this.handleDelete(comment) }/>
                : ''}
        </div>
    )

    render() {
        return (
            <div className="text-left">
                <div className="my-3 p-3 bg-white rounded shadow-sm">
                    <h6 className="border-bottom border-gray pb-2 mb-0">
                        Comments
                    </h6>
                    { this.state.comments.length <= 0 
                        ? 'No comments to show up'
                        : this.state.comments.map( (comment, i) => 
                        <span key={i}>{this.renderComment(comment)} </span> )}
                </div>
                <form>
                    <div 
                        role='alert'
                        className={this.state.error ? 'alert alert-danger': ''} 
                        onClick={() => this.setState({ error: ''})}>{ this.state.error }
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                            Comment
                        </label>
                        <textarea
                            disabled={false}
                            value={this.state.newComment}
                            onChange={({ target }) => this.setState({ newComment: target.value })}
                            required="required"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Insert your comment here"
                        />
                    </div>
                    <button
                        disabled={false}
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.hadleSubmit}
                    > Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default CommentsBlock