import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header                           from './components/Header';
import Navigation                       from './components/Navigation';
import GameContextProvider              from './contexts/GameContext';
import CategoryContextProvider          from './contexts/CategoryContext';
import HistoryContextProvider           from './contexts/HistoryContext';
import Game                             from './components/Game';
import History1                         from './components/History1';
import About                            from './components/About';
import Contact                          from './components/Contact';
import GameHistory                      from './components/GameHistory';

function App() {
  return (
    <GameContextProvider>
      <HistoryContextProvider>
        <BrowserRouter basename="/tic-tac-toe">
          <div className='header'>
            <Header/>
            <Navigation/>
          </div>
          <CategoryContextProvider>
            <Switch>
              <Route path="/"        exact component={Game}        />
              <Route path="/history" exact component={History1}     /> 
              <Route path="/about"   exact component={About}       />
              <Route path="/contact" exact component={Contact}     />
              <Route path="/:id"     exact component={GameHistory} /> 
            </Switch>
          </CategoryContextProvider>
        </BrowserRouter>
      </HistoryContextProvider>
    </GameContextProvider>
  )
}

export default App;
