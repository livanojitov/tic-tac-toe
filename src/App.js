import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header              from './components/Header';
import Navigation          from './components/Navigation';
import GameContextProvider from './components/GameContext';
import Game                from './components/Game';
import History             from './components/History';
import About               from './components/About';
import Contact             from './components/Contact';
import GameHistory         from './components/GameHistory';

function App() {
  return (
    <GameContextProvider>
      <BrowserRouter>
        <div className='header'>
          <Header/>
          <Navigation/>
        </div>
        <Switch>
          <Route path="/"        exact component={Game}        />
          <Route path="/history" exact component={History}     /> 
          <Route path="/about"   exact component={About}       />
          <Route path="/contact" exact component={Contact}     />
          <Route path="/:id"     exact component={GameHistory} /> 
        </Switch>
      </BrowserRouter>
    </GameContextProvider>
  )
}

export default App;
