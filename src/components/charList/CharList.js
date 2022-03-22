import React, { useState, useRef, useEffect } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import CharInfo from '../charInfo/CharInfo';
import ErrorMessage from '../errrorMessage/ErrorMessage';

import './charList.scss';


const CharList = (props) =>{

    const [persons, setPerons] = useState([]);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    
    

    useEffect(()=>{            
        onRequest();
    }, []);

    const itemRefs = useRef([]);
    const {loading, error, getAllCharacters} = useMarvelService ();

    const onRequest = (offset) =>{
        getAllCharacters(offset)
        .then(
            data=> {
                let ended = false;
                if (data.length<9){
                    ended = true;
                }

                setPerons(persons => [...persons, ...data]);
                setOffset(offset => offset+9);
                setCharEnded(ended);
            })
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
                
                <CSSTransition key={i} timeout={500} classNames="char__item">
                    <li 
                    
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
                </CSSTransition>
               
            )
     })
        
        return result;
    }



    return (
        <div className="char__list">
            <ul className="char__grid">
            <TransitionGroup component={null}>
                 {persons.length > 0 ? drawCharList() : null}
            </TransitionGroup>
               

            </ul>
            <button 
            className="button button__main button__long"
            disabled={loading}
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