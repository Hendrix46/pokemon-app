import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import './style.css';
import {TYPE_OPTIONS} from "../constants";

const Card = ({pokemon, loading}) => {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pokeName, setPokeName] = useState('');
    const [pokeHeight, setPokeHeight] = useState('');
    const [pokeWeight, setPokeWeight] = useState('');
    const [pokeImg, setPokeImg] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [filterInput, setFilterInput] = useState('all');

    const openPokeInfo = async(res) => {
        setPokeName(res.name);
        setPokeHeight(res.height);
        setPokeWeight(res.weight);
        setPokeImg(res.sprites.front_default);
        handleShow();
    }


    return(
        <>
            <Modal show={showModal} onHide={handleClose}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{pokeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="poke-content">
                    <img src={pokeImg} className="img-fluid img-height" alt="Pokemon image"/>
                    <p>
                        Height : {pokeHeight}
                    </p>
                    <p>
                        Weight : {pokeWeight}
                    </p>
                </Modal.Body>
            </Modal>
            <div className="row search-filter-row d-flex align-items-center">
                <div className="col-sm-6">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            onChange={event => {setSearchInput(event.target.value)}}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <select className="form-control" id="typeSelect"
                                onChange={event => {setFilterInput(event.target.value)}}>
                            {TYPE_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="row card-row">
                {
                    loading ? <h1>Loading...</h1> :
                        pokemon.filter((item) => {
                            if (searchInput === "" && filterInput === "all") {
                                return item;
                            } else if (searchInput !== "" && item.name.toLowerCase().includes(searchInput.toLowerCase())) {
                                return item;
                            } else if (filterInput !== "all" && item.types.some(type => type.type.name === filterInput)) {
                                return item;
                            }
                        }).map((item) => {
                            console.log(item)
                            return (
                                <div className={`col-md-${Math.floor(12 / Math.min(4, pokemon.length))}`} key={item.id}>
                                    <div className="card poke-card" onClick={() => openPokeInfo(item)}>
                                        <img className="card-img-top card-img" src={item.sprites.front_default} alt="Card image"/>
                                        <div className="card-body">
                                            <h5 className="card-title poke-name">{item.name}</h5>
                                            <br/>
                                            {item.types.map(type=> (
                                                <p className="poke-type">Type: {type.type.name}</p>
                                            ))}
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            )
                        })
                }

            </div>
        </>

    )
}

export default Card;