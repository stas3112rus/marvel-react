import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Helmet} from "react-helmet";
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errrorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import './singleComicPage.scss';

const SingleCharacterPage = () => {
    const {characterId} = useParams();

    const [character, setCharacter] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateCharacter()
        
    }, [characterId])

    const updateCharacter = () => {
        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded)
    }

    const onCharacterLoaded = (comic) => {
        setCharacter(comic);
        console.log(comic)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <View character={character}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({character}) => {
    const {name, desc, thumbnail} = character;

    console.log(desc);

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`Page of Marvel Character ${name}`}
                    />
                <title>Marvel character {name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{desc}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
        </div>
    )
}



export default SingleCharacterPage;