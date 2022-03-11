import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = (props) =>  {
    
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    


    const marvelService = new MarvelService ();

    useEffect(()=>{
        updateChar();
    },[])

    useEffect(()=>{
        updateChar() 
    },[props.charId])
    
    const updateChar = () =>{
        const {charId} = props;
       
        if (!charId){
            return;
        }

        onCharLoading();

        marvelService.getCharacter(charId)
        .then(onCharLoaded);        
    }

    const  onError = ()=>{
        setLoading(false);
        setError(true);
    }

    const onCharLoading = ()=>{
        setLoading(true);
    }
 

    const onCharLoaded = (char) =>{     
            setChar(char);
            setLoading(false);
       
    }

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content =  !( loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage} 
            {spinner}
            {content}
        </div>
    )
      
}

const View = ({char}) =>{

    const {name, desc, thumbnail, homepage, wiki, thumbnailStyle, comics} = char;
    
    const getComicsList = () =>{
        let comicsList=[];
        if (comics.length === 0) {
            comicsList.push({name: "We don't know comics about this person"});              
           return comicsList;
        }

        if (comics.length > 10){

            for (let i = 0; i<10; i++){
                comicsList.push(comics[i]);
            }

             return comicsList;
        }

        return comics;
    };

    

    return (
        <>
            <div className="char__basics">
                <img 
                    src={thumbnail} 
                    alt={name}
                    style={thumbnailStyle}
                    />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {desc}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                
                {getComicsList().map((item, i)=>{
                    return(                        
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>)
                })} 

            </ul>
        </>
    )

}

CharInfo.propTypes = {
    charId: PropTypes.number, 
}

export default CharInfo;