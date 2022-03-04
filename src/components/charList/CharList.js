import React, { Component } from 'react';

import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import CharInfo from '../charInfo/CharInfo';
import ErrorMessage from '../errrorMessage/ErrorMessage';
import './charList.scss';


class CharList extends Component {
    
    state = {
        persons: [],
        newPersonLoading: false,
        offset: 210,
        charEnded: false
    }

    itemRefs = [];

    marvelService = new MarvelService ();
    
    getPersons = () => {
        this.marvelService.getAllCharacters()
        .then(
            data=> {
                this.setState({persons: data})
            })
        .catch(<ErrorMessage/>);

    }

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {

        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    drawCharList = () =>{
     const result =  this.state.persons.map ((person, i)=>{      
        
        return (
            <li 
            key={person.id} 
            ref={this.setRef}
            className="char__item"
            onClick={()=> {
                this.props.onCharSelected(person.id);
                this.focusOnItem(i);
            }}
            >
                <img 
                    src={person.thumbnail} 
                    alt={person.name}
                    style = {person.thumbnailStyle}
                    />
                <div className="char__name">{person.name}</div>
            </li>
         )
     })
        
        return result;
    }

    componentDidMount(){
        this.onRequest();       
    }

    onRequest = (offset) =>{
        this.marvelService.getAllCharacters(offset)
        .then(
            data=> {
                let ended = false;
                if (data.length<9){
                    ended = true;
                }

                this.setState((state)=>({
                    persons: [...state.persons, ...data],
                    newPersonLoading: false,
                    offset: state.offset + 9,
                    charEnded: ended
                }))
            })
        .catch(<ErrorMessage/>);
    }

    onCharLoading = () =>{
        this.setState({newPersonLoading: true});
    }

    render (){

        const {newPersonLoading, offset, charEnded} = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.persons.length > 0 ? this.drawCharList() : null}
                </ul>
                <button 
                className="button button__main button__long"
                disabled={newPersonLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={()=>(this.onRequest(offset))}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


CharInfo.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;