import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import DeckDelete from "../Delete/DeckDelete";
import CardDelete from "../Delete/CardDelete";

function Deck() {
    const [deck, setDeck] = useState([]);
    const [cardPull, setCardPull] = useState([]);
    const { deckId } = useParams();
    const history = useHistory();

    //loads the appropriate deck
    useEffect(() => {
        const deckAbort = new AbortController();

        async function loadDeck() {
            try{
                const pullDeck = await readDeck(deckId, deckAbort.signal);
                setDeck(pullDeck);
                setCardPull(pullDeck.cards)
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

    //returns an array of cards that can be mapped for each card.
    let printCards;
        if(cardPull) {
        printCards = cardPull.map((card) => {
            return (
                <div className="cards border rounded m-1" key={card.id}>
                    <div className="m-1">
                        <p className="font-weight-bold">Front</p>
                        <p>{card.front}</p>
                    </div>

                    <div className="m-1">
                        <p className="font-weight-bold">Back</p>
                        <p>{card.back}</p>
                    </div>
                    <div>
                    <button 
                        className="btn btn-secondary m-1"
                        onClick={() => history.push(`/decks/${deck.id}/cards/${card.id}/edit`)}
                        >
                        <span className="oi oi-pencil ml-1 float-right"></span>
                        Edit
                    </button>
                        <CardDelete cardId={card.id} deckId={deck.id} />
                    </div>
                </div>
            )
        })
    }
    else {
        printCards = "Loading";
    }

    //console.log(deck);
    //console.log(cardPull);
    return (
        <div className="deck">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home mx-1"></span>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div className="header">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
            </div>
            <div className="buttons ">

                <button 
                className="btn btn-secondary mx-1"
                onClick={() => history.push(`/decks/${deck.id}/edit`)}>
                    <span className="oi oi-pencil mr-1"></span>
                    Edit
                </button>

                <button 
                    className="btn btn-primary mx-1" 
                    onClick={() => history.push(`/decks/${deck.id}/study`)}>
                        <span className="oi oi-book mr-1"></span>
                        Study
                </button>

                <button 
                    className="btn btn-primary mx-1"
                    onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                        <span className="oi oi-plus mr-1"></span>
                        Add Cards
                </button>

                <DeckDelete deckId={deck.id} />

            </div>
            <h3 className="my-2">Cards</h3>
            <div>{printCards}</div>
        </div>
    )
}

export default Deck;