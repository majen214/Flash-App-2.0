import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckDelete from "../Delete/DeckDelete";

function DeckList() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const deckAbort =  new AbortController();

        async function decksList() {
            try {
                const list = await listDecks(deckAbort.signal);
                setDecks(list);
            }
            catch (error) {
                console.log("error creating deck list");
            }
            return () => {
                deckAbort.abort();
            };
        }

        decksList();
    }, [])

    const printList = decks.map((deck) => {
        
        return (
            <div className="border rounded p-2 my-2" key={deck.id}>
                <div>
                    <h3>{deck.name}
                    <small className="float-right">{deck.cards.length} cards</small></h3>
                </div>
                <div>
                    <p>{deck.description}</p>
                </div>
                <div>
                    <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
                        <span className="oi oi-eye mx-1"></span>
                        View
                    </button>
                    <button className="btn btn-primary" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                        <span className="oi oi-book mx-1"></span>
                        Study
                    </button>
                        <DeckDelete deckId={deck.id} />
                </div>
            </div>
        )
    })

    return (
        <div className="decks">
            {printList}
        </div>
    )
}

export default DeckList;