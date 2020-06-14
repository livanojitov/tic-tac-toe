export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GAME':
      action.game.id = ((state.length === 0)? 0 : state[state.length -1].id + 1);
      return [...state, action.game]
    case 'REMOVE_GAME':
      action.id = action.id * 1;
      return state.filter(game => game.id !== action.id);  
    default:
      break;
  }
}