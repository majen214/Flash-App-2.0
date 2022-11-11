import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import CreateDeck from "../Deck/CreateDeck";
import Study from "../Deck/Study";
import EditDeck from "../Deck/EditDeck";
import Deck from "../Deck/Deck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";

function Layout() {
  return (
    <>
    
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
             <Home />
          </Route>

          <Route exact path="/decks/new"> 
            <CreateDeck /> 
          </Route>

          <Route exact path="/decks/:deckId"> 
            <Deck /> 
          </Route>

          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route> 
        </Switch>
      </div>
    </>
  );
}

export default Layout;
