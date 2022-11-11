import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    //handles the updating of the "name" and "description" values that will be put into the new deck
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    //on submit, udpates a new deck in data/db.json, then the site directs to the new decks "view" page
    const handleSubmit = (event) => {
        event.preventDefault();
        createDeck({
            name: name,
            description: description,
        }).then((newDeck) => history.push(`/decks/${newDeck.id}`))
        // console.log(name);
        // console.log(description);
    }
    return (
        //the create deck form saves the data inputted by the form into data/db.json
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h3>Create Deck</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Deck Name"
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
                placeholder="Brief description of the deck"
                required
                onChange={handleDescriptionChange}
                value={description}
                ></textarea>
            </div>
            <br />
            <button className="btn btn-secondary mx-1" onClick={() => history.push(`/`)}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary mx-1">
                Submit
            </button>
        </form>
        </div>
    )

}

export default CreateDeck;