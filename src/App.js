import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header                           from './components/Header';
import Navigation                       from './components/Navigation';
import GameContextProvider              from './contexts/GameContext';
import CategoryContextProvider          from './contexts/CategoryContext';
import HistoryContextProvider           from './contexts/HistoryContext';
import LanguageContextProvider          from './contexts/LanguageContext';
import Game                             from './components/Game';
import History1                         from './components/History1';
import About                            from './components/About';
import Contact                          from './components/Contact';
import GameHistory                      from './components/GameHistory';

const closeMobileMenu = () => {
  var chk = document.querySelector('input#menu');
  if (chk){
    chk.checked = false;
  }
}

function App() {
  return (
    <GameContextProvider>
      <HistoryContextProvider>
        <LanguageContextProvider>
          <BrowserRouter  basename="/tic-tac-toe">
            <div className='header'>
              <Header/>
              <Navigation/>
            </div>
            <CategoryContextProvider>
              <Switch>
                <Route path="/"        exact render={(props)=>{closeMobileMenu();return (<Game        {...props}/>)}}  />
                <Route path="/history" exact render={(props)=>{closeMobileMenu();return (<History1    {...props}/>)}}  />
                <Route path="/about"   exact render={(props)=>{closeMobileMenu();return (<About       {...props}/>)}}  />
                <Route path="/contact" exact render={(props)=>{closeMobileMenu();return (<Contact     {...props}/>)}}  /> 
                <Route path="/:id"     exact render={(props)=>{closeMobileMenu();return (<GameHistory {...props}/>)}}  /> 
              </Switch>
            </CategoryContextProvider>
          </BrowserRouter>
        </LanguageContextProvider>
      </HistoryContextProvider>
    </GameContextProvider>
  )
}

export default App;
