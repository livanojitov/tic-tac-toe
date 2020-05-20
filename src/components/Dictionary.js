const EMPTY = 0;
const COMPUTER = 1;
const USER = 2;
const TOTAL_SQUARES = 9;
const EASY = 1;
const HARD = 2;
const NORMAL = 3;
const LOST = 0;
const WON =  1;
const DRAW = 2;

const DICTIONARY = [
{
  GAME: 'Game',
  HISTORY: 'Historical',
  ABOUT: 'About',
  CONTACT: 'Contact', 
  
  CATEGORY: 'Category',
  CATEGORIES: [
    {name: 'La Havana landmarks'},
    {name: 'Vancouver landmarks'},
    {name: 'Soccer players'},
    {name: 'Fruits & Vegetables'},
    {name: 'Animals'},
    {name: 'Alphabet'}, 
    {name: 'Puppies'},
    {name: 'Seinfeld'},
    {name: 'Spain landmarks'},
    {name: 'Germany landmarks'}],

  YOU: 'You',
  OPPONENT: 'Computer',
  USER_IMAGE_TOOLTIP: 'You will play with this image.',
  COMPUTER_IMAGE_TOOLTIP: 'The computer will play with this image.',
  REFRESH_TOOLTIP: 'Click to play with a different image.',
  
  START: 'You Start',
  START_TOOLTIP: 'Who starts playing the game: You or the computer?',
  STARTED_BY: 'Started by:',
  STARTED_BY_PLAYER: 'You',
  YES: 'Yes',
  YES_TOOLTIP: 'You start playing the game.',
  NO: 'No',
  NO_TOOLTIP: 'The computer starts playing the game.',
  
  LEVEL: 'Level',
  LEVEL_TOOLTIP: 'How much thinking the computer does before playing.',
  LEVEL_EASY: 'Easy',
  LEVEL_HARD: 'Hard',
  LEVEL_NORMAL: 'Normal',
  LEVEL_EASY_HISTORY: 'Level: Easy',
  LEVEL_HARD_HISTORY: 'Level: Hard',
  LEVEL_NORMAL_HISTORY: 'Level: Normal',
  
  PLAY: 'Start the game',
  GAME_OVER: 'Game over',
  PLAY_AGAIN: 'Play again',
  MESSAGE_LOST: 'You lost!',
  MESSAGE_WON: 'You won!',
  MESSAGE_DRAW: 'It\'s a draw!',
  
  GAME_WRITTEN_WITH: 'This game has been developed with:',
  SOURCE_CODE: 'Source Code:',
  OTHER_GAMES: 'Other games:',
  
  AUTHOR: 'Author:',
  EMAIL: 'E-mail:',
  GITHUB: 'Github:',
  LINKEDIN: 'LinkedIn:',
  AVAILABILITY: 'Availability:',
  AVAILABILITY_STATUS: 'Right away',
  
  NO_HISTORY_YET: 'There is no historical data yet. Play some games and comeback.',
  START_OVER: 'Play again',
  SEE_GAME: 'See Game',
  DELETE_GAME: 'Delete Game',
  BACK: 'Back', 
},

{
  GAME: 'Jeu',
  HISTORY: 'Historique',
  ABOUT: 'À propos de',
  CONTACT: 'Contact',  

  CATEGORY: 'Catégorie',
  CATEGORIES: [
    {name: 'La Havane monuments'},
    {name: 'Vancouver monuments'},
    {name: 'Joueurs du soccer'},
    {name: 'Fruits et légumes'},
    {name: 'Des animaux'},
    {name: 'L\'alphabet'}, 
    {name: 'Des chiots'},
    {name: 'Seinfeld'},
    {name: 'L\'Espagne monuments'},
    {name: 'L\'Allemagne monuments'}],

  YOU: 'Toi',
  OPPONENT: 'Ordinateur',
  USER_IMAGE_TOOLTIP: 'Tu vas jouer avec cette image.',
  COMPUTER_IMAGE_TOOLTIP: 'L\'ordinateur va jouer avec cette image.',
  REFRESH_TOOLTIP: 'Fais clic à fin de jouer avec une autre image.',

  START: 'Premier coup',
  START_TOOLTIP: 'Qui commence la partie: L\'ordinateur ou toi?',
  STARTED_BY: 'Commencé par:',
  STARTED_BY_PLAYER: 'Toi',
  YES: 'Oui',
  YES_TOOLTIP: 'Tu effectues le premier coup de la partie.', 
  NO: 'Non',
  NO_TOOLTIP: 'L\'ordinateur effectue le premier coup de la partie.',

  LEVEL: 'Niveau',
  LEVEL_TOOLTIP: 'Quelle est la réflexion de l\'ordinateur avant de jouer.',
  LEVEL_EASY: 'Facile',
  LEVEL_HARD: 'Difficile',
  LEVEL_NORMAL: 'Normal',
  LEVEL_EASY_HISTORY: 'Niveau: Facile',
  LEVEL_HARD_HISTORY: 'Niveau: Difficile',
  LEVEL_NORMAL_HISTORY: 'Niveau: Normal',

  PLAY: 'Commencer la partie',
  GAME_OVER: 'La partie est finie',
  PLAY_AGAIN: 'Jouer à nouveau',
  MESSAGE_LOST: 'Tu as perdu!',
  MESSAGE_WON: 'Tu as gagné!',
  MESSAGE_DRAW: 'Match nul!',

  GAME_WRITTEN_WITH: 'Ce jeu a été développé avec:',
  SOURCE_CODE: 'Code source:',
  OTHER_GAMES: 'D\'autres jeux:',

  AUTHOR: 'Auteur:',
  EMAIL: 'Courrier électronique:',
  GITHUB: 'Github:',
  LINKEDIN: 'LinkedIn:',
  AVAILABILITY: 'Disponibilité:',
  AVAILABILITY_STATUS: 'Immédiatement',

  NO_HISTORY_YET: 'Il n\'y a pas encore d\'historique. Reviens un peu plus tard après avoir joué quelques parties.',

  START_OVER: 'Reprendre le jeu',
  SEE_GAME: 'Voir la partie',
  DELETE_GAME: 'Retirer la partie',
  BACK: 'Retour'
},

{
  GAME: 'Juego',
  HISTORY: 'Histórico',  
  ABOUT: 'Acerca de',
  CONTACT: 'Contacto',

  CATEGORY: 'Categoría',
  CATEGORIES: [
    {name: 'La Habana monumentos'},
    {name: 'Vancouver monumentos'},
    {name: 'Jugadores de fútbol'},
    {name: 'Frutas y vegetales'},
    {name: 'Animales'},
    {name: 'El Alfabeto'}, 
    {name: 'Cachorros'},
    {name: 'Seinfeld'},
    {name: 'España monumentos'},
    {name: 'Alemania monumentos'}],
    
  YOU: 'Tú',
  OPPONENT: 'Ordenador',
  USER_IMAGE_TOOLTIP: 'Tú jugaras con esta imagen.',
  COMPUTER_IMAGE_TOOLTIP: 'El ordenador jugará con esta imagen.',
  REFRESH_TOOLTIP: 'Haga click para jugar con una imagen diferente.',
  
  START: 'Tú empiezas',
  START_TOOLTIP: 'Quién empieza la partida: Tú o el ordenador?',
  STARTED_BY: 'Comenzada por:',
  STARTED_BY_PLAYER: 'Ti',
  YES: 'Sí',
  YES_TOOLTIP: 'Tú empiezas la partida.',
  NO: 'No',
  NO_TOOLTIP: 'El ordenador empieza la partida.',
  
  LEVEL: 'Nivel',
  LEVEL_TOOLTIP: 'Cuánto tiempo el ordenador piensa antes de jugar.',
  LEVEL_EASY: 'Fácil',
  LEVEL_HARD: 'Difícil',
  LEVEL_NORMAL: 'Normal',
  LEVEL_EASY_HISTORY: 'Nivel: Fácil',
  LEVEL_HARD_HISTORY: 'Nivel: Difícil',
  LEVEL_NORMAL_HISTORY: 'Nivel: Normal',
  
  PLAY: 'Empezar la partida',
  GAME_OVER: 'Partida acabada',
  PLAY_AGAIN: 'Jugar de nuevo',
  MESSAGE_LOST: 'Perdiste!',
  MESSAGE_WON: 'Ganaste!',
  MESSAGE_DRAW: 'Empate!',
  
  GAME_WRITTEN_WITH: 'Este juego ha sido desarrollado con:',
  OTHER_GAMES: 'Otros juegos:',
  SOURCE_CODE: 'Código fuente:',
  
  AUTHOR: 'Autor:',
  EMAIL: 'Correo electrónico:',
  GITHUB: 'Github:',
  LINKEDIN: 'LinkedIn:',
  AVAILABILITY: 'Disponibilidad:',
  AVAILABILITY_STATUS: 'Inmediatamente',
    
  NO_HISTORY_YET: 'No hay historial aún. Juegue algunas partidas y regrese luego.',

  START_OVER: 'Jugar de nuevo',
  SEE_GAME: 'Ver la partida',
  DELETE_GAME: 'Eliminar la partida',
  BACK: 'Regresar'
}

];

export { EMPTY, COMPUTER, USER, EASY, HARD, NORMAL, TOTAL_SQUARES, LOST, WON, DRAW };
export default DICTIONARY;