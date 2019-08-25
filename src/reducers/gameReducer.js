export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GAME':
      action.game.id = Math.floor(Math.random() * 10000);
      return [...state, action.game]
    case 'REMOVE_GAME':
      action.id = action.id * 1;
      return state.filter(game => game.id !== action.id);    
    default:
      break;
  }
}