import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) =>  {
    
    const [char, setChar] = useState(null);

    const {process, setProcess, getCharacter, clearError} = useMarvelService ();

    useEffect(()=>{
        updateChar();
    },[])

    useEffect(()=>{
        updateChar() 
    },[props.charId])
    
    const updateChar = () =>{
        clearError();
        const {charId} = props;
       
        if (!charId){
            return;
        }

        getCharacter(charId)
        .then(onCharLoaded)
        .then(()=>setProcess('confirmed'))        
    } 

    const onCharLoaded = (char) =>{     
            setChar(char);         
    }


 
    return (       
            <div className="char__info">
               { setContent(process, View, char) }
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