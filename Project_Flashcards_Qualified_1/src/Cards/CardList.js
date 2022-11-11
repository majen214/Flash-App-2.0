import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CardList({deck, cardCount, cards}){
    const [index, setIndex] = useState(0);
    const [flipSide, setFlipSide] = useState(true);
    const history = useHistory();

    if (cardCount < 3) {
        return (
            <div>
                <h4> Not Enough Cards</h4>
                <p> You need at least 3 cards to study. There are {cardCount} cards in this deck</p>
                <button 
                    className="btn btn-primary"
                    onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>
                    <span className="oi oi-plus mr-1"></span>
                    Add Cards
                </button>
            </div>
        )
    }

    //flips the cards between the front and back using a boolean
    function flipClick() {
        setFlipSide(!flipSide);
    }

    //cycles through the deck. once the deck is complete, the user is prompted to either restart or return home 
    function nextClick() {
        if (index < (cardCount-1)) {
            setIndex(index + 1);
            setFlipSide(true);
        }
        else {
            const restartPrompt = window.confirm("Restart? Click 'Cancel' to return to the home page.");
            //if restart prompt returns true, reset the deck to the initial conditions
            if (restartPrompt) {
                setIndex(0);
                setFlipSide(true);
            }
            //if restart prompt is false, go home
            else history.push("/");
            
        }
    }

    
    return (
        <div className="card-body border rounded p-2 my-2">
            <div className="card-title">
                <h4>Card {index + 1} of {cardCount}</h4>
                <p>{flipSide ? cards[index]?.front : cards[index]?.back}</p>
            </div>
            <div className="buttons">
                <button className="btn btn-secondary mx-1" onClick={flipClick}>Flip</button>
                {!flipSide && (<button className="btn btn-primary" onClick={nextClick}>Next</button>)}
            </div>
        </div>
    )

}

export default CardList;