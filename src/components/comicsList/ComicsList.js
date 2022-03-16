import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [offsetCommics, setOffsetCommics] = useState(0);
    
    const {getAllComics} = useMarvelService();

    useEffect(()=>{
        onRequest();
    }, []);



    const onRequest = () =>{
        getAllComics(offsetCommics)
        .then(
            data => {                
                setComics(comics=>[...comics, ...data])
            }
        )
        setOffsetCommics(offsetCommics=>offsetCommics+8)
    }
 

    function checkAvalibale(arg, alternative, prefix=''){
        if (!arg || arg == 0){
            return alternative
        }

        return `${prefix}${arg}`
    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comics.map((comic, i)=>{
                    return(
                        <ComicsLi
                        key={i}
                        id={comic.id}
                        title={comic.title}
                        url={checkAvalibale(comic.url, null)}
                        price={checkAvalibale(comic.price, 'not avalibale', '$')}
                        img={checkAvalibale(comic.coverImg, 'https://pbs.twimg.com/profile_images/1354379504920256513/4Ox0Xqft_400x400.jpg')}
                        />
                    )
                })}  
            </ul>
            <button 
            className="button button__main button__long"
            onClick={()=>(onRequest(offsetCommics))}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ComicsLi = (props) =>{
        const {title, url, price, img, id} = props;

    
    
    return (
        <li className="comics__item">
            <Link to={`/comics/${id}`}>
                <img src={img} alt={title} className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
            </Link>
        </li>   
    )
}



export default ComicsList;