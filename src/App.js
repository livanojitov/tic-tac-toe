import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GameContextProvider from "./contexts/GameContext";
import GameDBContextProvider from "./contexts/GameDBContext";
import DictionaryContextProvider from "./contexts/DictionaryContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Game from "./components/Game/Game";
import GameHistorical from "./components/Game/Historical";
import Historical from "./components/Historical/Historical";
import Repository from "./components/Repository/Repository";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <BrowserRouter basename="/tic-tac-toe">
      <DictionaryContextProvider>
        <div className="header">
          <Header />
          <Navigation />
        </div>
        <CategoryContextProvider>
          <GameDBContextProvider>
            <GameContextProvider>
              <Switch>
                <Route path="/" exact component={Game} />
                <Route path="/historical" exact component={Historical} />
                <Route path="/repository" component={Repository} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/historical/:id" component={GameHistorical} />
              </Switch>
            </GameContextProvider>
          </GameDBContextProvider>
        </CategoryContextProvider>
      </DictionaryContextProvider>
    </BrowserRouter>
  );
}

export default App;
