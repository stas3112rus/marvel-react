import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

class CharInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            char: null,
            loading: false,
            error: false, 
           
        }              
    }

    marvelService = new MarvelService ();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }



    updateChar = () =>{
        const {charId} = this.props;
       
        if (!charId){
            return;
        }

        this.onCharLoading();

        this.marvelService.getCharacter(charId)
        .then(this.onCharLoaded); 
 
       
    }

    onError = ()=>{
        this.setState({           
            loading: false,
            error: true
        });
    }

    onCharLoading = ()=>{
        this.setState({
            loading: true
        })
    }
 

    onCharLoaded = (char) =>{     
            
            this.setState({
                char,
                loading: false
            });           
    }

    render (){

        const {char, loading, error} = this.state;

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