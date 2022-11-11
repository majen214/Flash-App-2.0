import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api/index";

function EditDeck() {
    const history = useHistory();
    const [deck, setDeck] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { deckId } = useParams();
    //handles the updating of the "name" and "description" values that will be put into the new deck
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

        //loads the appropriate deck
        useEffect(() => {
            const deckAbort = new AbortController();
    
            async function loadDeck() {
                try{
                    const pullDeck = await readDeck(deckId, deckAbort.signal);
                    setDeck(pullDeck);
                    setName(pullDeck.name);
                    setDescription(pullDeck.description);
                }
                catch (error) {
                    console.log("error creating deck list");
                }
    
                return () => {
                    deckAbort.abort();
                }
            }
    
            loadDeck();
        }, [deckId])

    //on submit, udpates a new deck in data/db.json, then the site directs to the new decks "view" page
    const handleSubmit = (event) => {
        event.preventDefault();
        updateDeck({
            ...deck,
            name: name,
            description: description,
        }).then((newDeck) => history.push(`/decks/${newDeck.id}`))
        // console.log(name);
        // console.log(description);
    }
    return (
        //the create deck form saves the data inputted by the form into data/db.json
        <div className="edit-deck">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h3>Edit: {deck.name}</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                className="form-control" 
                id="name" 
                required
                onChange={handleNameChange} 
                value={name}
                 />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                className="form-control" 
                id="description" 
                rows="3" 
                required
                onChange={handleDescriptionChange}
                value={description}
                ></textarea>
            </div>
            <br />
            <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary mx-1">
                Submit
            </button>
        </form>
        </div>
    )

}

export default EditDeck;