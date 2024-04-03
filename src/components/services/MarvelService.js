class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _appKey = 'apikey=' + process.env.REACT_APP_API_MARVEL_DB;
    _baseOffset = 210;

    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._appKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._appKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    getTotalCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=1&offset=1&${this._appKey}`);
        return res.data.total;
    }

    _transformCharacter = (char) => {
        let thumbnailStyles = {
            objectFit: "cover"
        },
            nameImg = char.thumbnail.path.slice(char.thumbnail.path.lastIndexOf('/') + 1);
        if (nameImg === 'image_not_available') {
            thumbnailStyles.objectFit = 'contain';
        }
        //console.log(char.thumbnail.path.slice(char.thumbnail.path.lastIndexOf('/') + 1));

        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            thumbnailStyles: thumbnailStyles,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;