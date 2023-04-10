import { useEffect, useState } from "react";
import axios from "axios";
import {BASE_URL} from "../constants";

export const usePokemonData = (perPage, currentPage) => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [disable, setDisable] = useState(true);

    const pokeFunc = async () => {
        setLoading(true);

        const res = await axios.get(`${BASE_URL}?limit=${perPage}&offset=${(currentPage - 1) * perPage}`);

        setLoading(false);

        if (res.data.previous != null) {
            setDisable(false);
        } else {
            setDisable(true);
        }

        const pokemonRequests = res.data.results.map(item => axios.get(item.url));
        const pokemonResponses = await Promise.all(pokemonRequests);
        const pokemonData = pokemonResponses.map(response => response.data);
        setPokeData(pokemonData);
    }

    useEffect(() => {
        pokeFunc();
    }, [BASE_URL, perPage, currentPage]);

    return [pokeData, loading, disable, setPokeData ,pokeFunc];
}