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
  CATEGORY: 'Category',
  CATEGORIES: [
    {name: 'La Havana'},
    {name: 'Vancouver'},
    {name: 'Soccer players'},
    {name: 'Fruits & Vegetables'},
    {name: 'Animals'},
    {name: 'Alphabet'}, 
    {name: 'Puppies'},
    {name: 'Seinfeld'},
    {name: 'Spain'},
    {name: 'Germany'}],

  YOU: 'You',
  OPPONENT: 'Computer',
  REFRESH: 'New',
  USER_IMAGE_TOOLTIP: 'You will play with this image.',
  COMPUTER_IMAGE_TOOLTIP: 'The computer will play with this image.',
  REFRESH_TOOLTIP: 'Click to play with a different image.',
  
  START: 'You Start',
  START_TOOLTIP: 'Who starts playing the game: You or the computer?',
  START_HISTORY: 'Started by:',
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
  HIRE_ME: 'For hire!',
  
  NO_HISTORY_YET: 'No history yet. Play some games and comeback.',
  START_OVER: 'Play again',
  SEE_GAME: 'See Game',
  DELETE_GAME: 'Delete Game',
  BACK: 'Back',

  GAME: 'Game',
  HISTORY: 'Historical',
  ABOUT: 'About',
  CONTACT: 'Contact',  
},

{
  CATEGORY: 'Catégorie',
  CATEGORIES: [
    {name: 'La Havane'},
    {name: 'Vancouver'},
    {name: 'Joueurs du soccer'},
    {name: 'Fruits et légumes'},
    {name: 'Des animaux'},
    {name: 'L\'alphabet'}, 
    {name: 'Des chiots'},
    {name: 'Seinfeld'},
    {name: 'Espagne'},
    {name: 'Allemagne'}],

  YOU: 'Vous',
  OPPONENT: 'Ordinateur',
  REFRESH: 'Nouvelle',
  USER_IMAGE_TOOLTIP: 'Vous allez jouer avec cetter image.',
  COMPUTER_IMAGE_TOOLTIP: 'L\'ordinateur va jouer avec cetter image.',
  REFRESH_TOOLTIP: 'Cliquez pour jouer avec une autre image.',

  START: 'Tu commences',
  START_TOOLTIP: 'Qui commence le jeu: Vous ou L\'ordinateur?',
  START_HISTORY: 'Commencé par:',
  YES: 'Oui',
  YES_TOOLTIP: 'Vous commencez à jouer le jeu.', 
  NO: 'Non',
  NO_TOOLTIP: 'L\'ordinateur commence à jouer le jeu.',

  LEVEL: 'Niveau',
  LEVEL_TOOLTIP: 'Quelle est la réflexion de l\'ordinateur avant de jouer.',
  LEVEL_EASY: 'Facile',
  LEVEL_HARD: 'Difficile',
  LEVEL_NORMAL: 'Normal',
  LEVEL_EASY_HISTORY: 'Niveau: Facile',
  LEVEL_HARD_HISTORY: 'Niveau: Difficile',
  LEVEL_NORMAL_HISTORY: 'Niveau: Normal',

  PLAY: 'Commencer le jeu',
  GAME_OVER: 'Jeu terminé',
  PLAY_AGAIN: 'Rejouer',
  MESSAGE_LOST: 'Vous avez perdu!',
  MESSAGE_WON: 'Vous avez gagné!',
  MESSAGE_DRAW: 'Partie nulle!',

  GAME_WRITTEN_WITH: 'Ce jeu a été développé avec:',
  SOURCE_CODE: 'Code source:',
  OTHER_GAMES: 'D\'autres jeux:',

  AUTHOR: 'Auteur:',
  EMAIL: 'Courrier électronique:',
  GITHUB: 'Github:',
  LINKEDIN: 'LinkedIn:',
  HIRE_ME: 'Disponible immédiatement!',

  NO_HISTORY_YET: 'Pas encore d\'historique. Jouez à quelques jeux et revenez.',
  START_OVER: 'Reprendre le jeu',
  SEE_GAME: 'Voir le jeu',
  DELETE_GAME: 'Retirer le jeu',
  BACK: 'Retour',

  GAME: 'Jeu',
  HISTORY: 'Historique',
  ABOUT: 'À propos de',
  CONTACT: 'Contact',  
},

{
  CATEGORY: 'Categoría',
  CATEGORIES: [
    {name: 'La Habana'},
    {name: 'Vancouver'},
    {name: 'Jugadores de fútbol'},
    {name: 'Frutas y vegetales'},
    {name: 'Animales'},
    {name: 'El Alfabeto'}, 
    {name: 'Cachorros'},
    {name: 'Seinfeld'},
    {name: 'España'},
    {name: 'Alemania'}],
    
  YOU: 'Tú',
  OPPONENT: 'Ordenador',
  REFRESH: 'Nueva',
  USER_IMAGE_TOOLTIP: 'Tú jugaras con esta imagen.',
  COMPUTER_IMAGE_TOOLTIP: 'El ordenador jugará con esta imagen.',
  REFRESH_TOOLTIP: 'Haga click para jugar con una imagen diferente.',
  
  START: 'Tú empiezas',
  START_TOOLTIP: 'Quién empieza la partida: Tú o el ordenador?',
  START_HISTORY: 'Comenzada por:',
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
  
  PLAY: 'Empezar el juego',
  GAME_OVER: 'Juego acabado',
  PLAY_AGAIN: 'Jugar de nuevo',
  MESSAGE_LOST: ' perdió!',
  MESSAGE_WON: 'Tú ganaste!',
  MESSAGE_DRAW: 'Empate!',
  
  GAME_WRITTEN_WITH: 'Este juego ha sido desarrollado con:',
  OTHER_GAMES: 'Otros juegos:',
  SOURCE_CODE: 'Código fuente:',
  
  AUTHOR: 'Autor:',
  EMAIL: 'Correo electrónico:',
  GITHUB: 'Github:',
  LINKEDIN: 'LinkedIn:',
  HIRE_ME: 'Disponible inmediatamente!',
  
  
  NO_HISTORY_YET: 'No hay historial aún. Juegue algunas partidas y regrese luego.',
  START_OVER: 'Jugar de nuevo',
  SEE_GAME: 'Ver juego',
  DELETE_GAME: 'Eliminar juego',
  BACK: 'Regresar',

  GAME: 'Juego',
  HISTORY: 'Histórico',  
  ABOUT: 'Acerca de',
  CONTACT: 'Contacto',
}

];

export { EMPTY, COMPUTER, USER, EASY, HARD, NORMAL, TOTAL_SQUARES, LOST, WON, DRAW };
export default DICTIONARY;