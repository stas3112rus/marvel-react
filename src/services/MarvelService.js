

class MarvelService {
    #apiBase = 'https://gateway.marvel.com/v1/public/';
    
    #hash = 'df5223f0ca3c39117778f0fe206a5885';
    #publicKey = '1d433c99193a21d9ba7e90742c4025a5';
    #ts = 1;
    #baseOfset = 210;

    #notImage = 'image_not_available';


    getResource = async(url) =>{
        let res = await fetch(url);

        if (!res.ok){
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    }

    getAllCharacters = async (offset = this.#baseOfset)=>{
              
       const res = await this.getResource(`${this.#apiBase}characters?apikey=${this.#publicKey}&ts=${this.#ts}&offset=${offset}&hash=${this.#hash}&limit=9`);
       return res.data.results.map (item =>this.#transformCharacter(item));
    }

    getCharacter = async (id)=>{
        const res = await this.getResource(`${this.#apiBase}characters/${id}?apikey=${this.#publicKey}&ts=${this.#ts}&hash=${this.#hash}`);
        return this.#transformCharacter(res.data.results[0]);
    }

    #transformCharacter = (char) =>{   

        const thumbnailUrl = `${char.thumbnail.path}.${char.thumbnail.extension}`;
        const style = this.#getStyleImg(thumbnailUrl);


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
    
    #getStyleImg = (img) =>{     

        if (img.indexOf(this.#notImage) !== -1)
            return {objectFit: 'contain'}

        return null;        
    }
}

export default MarvelService;