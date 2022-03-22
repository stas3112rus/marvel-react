import {useHttp} from '../hooks/htpp.hook'

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const apiBase = 'https://gateway.marvel.com/v1/public/';
    
    const hash = 'df5223f0ca3c39117778f0fe206a5885';
    const publicKey = '1d433c99193a21d9ba7e90742c4025a5';
    const ts = 1;
    const baseOfset = 210;
    const baseOfsetComics = 0;

    const notImage = 'image_not_available';

    const getAllCharacters = async (offset = baseOfset)=>{
              
       const res = await request(`${apiBase}characters?apikey=${publicKey}&ts=${ts}&offset=${offset}&hash=${hash}&limit=9`);
       return res.data.results.map (item =>transformCharacter(item));
    }

    const getCharacter = async (id)=>{
        const res = await request(`${apiBase}characters/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}`);
        return transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = baseOfsetComics) =>{
        const res = await request(`${apiBase}comics?apikey=${publicKey}&ts=${ts}&offset=${offset}&hash=${hash}&limit=8`)
        return res.data.results.map(item=> transformComic(item));
    }

    const getComics = async (id) =>{
        const res = await request(`${apiBase}comics/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}`);
        return transformComic(res.data.results[0]);
    }


    const getCharacterId = async(name) =>{
        const res = await request(`${apiBase}characters?name=${name}&apikey=${publicKey}&ts=${ts}&hash=${hash}`);
        
        if (res.data.results.length === 0) {return false};

        return {
            name: res.data.results[0].name,
            id: res.data.results[0].id
        }

        
    }


    const transformCharacter = (char) =>{   

        const thumbnailUrl = `${char.thumbnail.path}.${char.thumbnail.extension}`;
        const style = getStyleImg(thumbnailUrl);


        return {
            id: char.id,
            name: char.name,
            desc: char.description,
            thumbnail: thumbnailUrl,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            thumbnailStyle: style,
            comics: char.comics.items
        }
    }

    const transformComic = (comic) =>{ 
        
        let coverImg, prices, comicUrl = null;     

        if (comic.images.length > 0){
            coverImg = `${comic.images[0].path}.${comic.images[0].extension}`
        }

        if (comic.prices.length > 0){
            prices = `${comic.prices[0].price}`
        }

        if (comic.urls.length>0){
            comicUrl = comic.urls[0].url;
        }


        return {
            id: comic.id,
            coverImg: coverImg,
            title: comic.title,
            price: prices,
            url: comicUrl,
            description: comic.description || 'There is no description',
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of pages',
            language: comic.textObjects.language || 'en-us',
        }
    }
    
    const getStyleImg = (img) =>{     

        if (img.indexOf(notImage) !== -1)
            return {objectFit: 'contain'}

        return null;        
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics, getCharacterId}
}

export default useMarvelService;