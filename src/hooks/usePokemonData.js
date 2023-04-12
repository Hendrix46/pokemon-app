import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonData } from "../store/reducers";

export const usePokemonData = (perPage, currentPage) => {
    const dispatch = useDispatch();
    const { pokeData, loading, disable } = useSelector(
        (state) => state.pokemonSlice
    );

    useEffect(() => {
        dispatch(fetchPokemonData({ perPage, currentPage }));
    }, [dispatch, perPage, currentPage]);

    return [pokeData, loading, disable];
};