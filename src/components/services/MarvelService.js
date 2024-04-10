import { useHttp } from "../../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _appKey = 'apikey=' + process.env.REACT_APP_API_MARVEL_DB;
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_appKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_appKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getTotalCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=1&offset=1&${_appKey}`);
        return res.data.total;
    }

    const _transformCharacter = (char) => {
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

    return { loading, error, getAllCharacters, getCharacter, clearError }
}

export default useMarvelService;