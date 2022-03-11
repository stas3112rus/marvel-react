import React, { useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import CharInfo from '../charInfo/CharInfo';
import ErrorMessage from '../errrorMessage/ErrorMessage';
import './charList.scss';


const CharList = (props) =>{

    const [persons, setPerons] = useState([]);
    const [newPersonLoading, setNewPersonLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    
    

    useEffect(()=>{            
        onRequest();
    }, []);

    const itemRefs = useRef([]);
    const marvelService = new MarvelService ();

    const onRequest = (offset) =>{
        marvelService.getAllCharacters(offset)
        .then(
            data=> {
                let ended = false;
                if (data.length<9){
                    ended = true;
                }

                setPerons(persons => [...persons, ...data]);
                setNewPersonLoading(newPersonLoading => false);
                setOffset(offset => offset+9);
                setCharEnded(charEnded=> ended);
            })
        .catch(<ErrorMessage/>);
    }   
    
    const getPersons = () => {
        marvelService.getAllCharacters()
        .then(data=> setPerons(data))
        .catch(<ErrorMessage/>);

    }

    const focusOnItem = (id) => {

        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const drawCharList = () =>{
        const result =  persons.map ((person, i)=>{      
        
            return (
                <li 
                key={person.id} 
                ref={(el)=>itemRefs.current[i] = el}
                className="char__item"
                onClick={()=> {
                    props.onCharSelected(person.id);
                    focusOnItem(i);
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

    const onCharLoading = () =>{
        setNewPersonLoading(true);
       
    }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {persons.length > 0 ? drawCharList() : null}
            </ul>
            <button 
            className="button button__main button__long"
            disabled={newPersonLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={()=>(onRequest(offset))}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharInfo.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;