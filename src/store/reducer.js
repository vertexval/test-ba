export function lockReducer(state = { counter: 1, gifs: null }, action) {
  if (action.type === "iteration") {
    return {
      ...state,
      counter: state.counter + 1
    };
  }
  if (action.type === 'lock') {
    return {
      ...state,
      gifs: action.payload.gifs
    };
  }

  return state;
}