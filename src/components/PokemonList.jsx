import React, {useState} from "react";
import Card from "./Card";

import './style.css'
import {usePokemonData} from "../hooks/usePokemonData";

const PokemonList = () => {
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokeData, loading, disable] = usePokemonData(perPage, currentPage)

    const handlePerPageChange = (event) => {
        setPerPage(parseInt(event.target.value));
        setCurrentPage(page => page + 1);
    };

    const handlePageChange = (event) => {
        const value = event.target.value
        if (!isNaN(parseInt(value))){
            setCurrentPage(value)
        }
    };

    return(
        <>
            <div className="container poke-list">
                {pokeData && <Card pokemon={pokeData} loading={loading} />}
                <div className="d-flex justify-content-between mt-5">
                    <div className="btn-div">
                        <button
                            type="button"
                            disabled={disable}
                            className="btn btn-func"
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                            }}
                        >
                            Previous
                        </button>
                        &nbsp;&nbsp;
                        <button
                            type="button"
                            className="btn btn-func"
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                            }}
                        >
                            Next
                        </button>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-8 col-form-label">Items per page:</label>
                        <div className="col-sm-4">
                            <select
                                className="form-control"
                                onChange={handlePerPageChange}
                                value={perPage}
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">
                            Page: {currentPage}
                        </label>
                        <div className="col-sm-8">
                            <input className="form-control" onChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PokemonList;
