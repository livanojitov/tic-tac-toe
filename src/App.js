import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header                           from './components/Header';
import Navigation                       from './components/Navigation';
import GameContextProvider              from './contexts/GameContext';
import HistoryContextProvider           from './contexts/HistoryContext';
import LanguageContextProvider          from './contexts/LanguageContext';
import DictionaryContextProvider        from './contexts/DictionaryContext';
import Game                             from './components/Game';
import History                          from './components/History';
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
    <DictionaryContextProvider>
      <GameContextProvider>
        <HistoryContextProvider>
          <LanguageContextProvider>
            <BrowserRouter basename="/tic-tac-toe">
              <div className='header'>
                <Header/>
                <Navigation/>
              </div>
              <Switch>
                <Route path="/"        exact render={(props)=>{closeMobileMenu();return (<Game        {...props}/>)}}  />
                <Route path="/history" exact render={(props)=>{closeMobileMenu();return (<History     {...props}/>)}}  />
                <Route path="/about"   exact render={(props)=>{closeMobileMenu();return (<About       {...props}/>)}}  />
                <Route path="/contact" exact render={(props)=>{closeMobileMenu();return (<Contact     {...props}/>)}}  /> 
                <Route path="/:id"     exact render={(props)=>{closeMobileMenu();return (<GameHistory {...props}/>)}}  /> 
              </Switch>
            </BrowserRouter>
          </LanguageContextProvider>
        </HistoryContextProvider>
      </GameContextProvider>
    </DictionaryContextProvider>
  )
}

export default App;
