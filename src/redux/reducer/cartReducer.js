const initialState = {
  cart: []
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "":
      return state
    default: return state
  }
}

export default cartReducer