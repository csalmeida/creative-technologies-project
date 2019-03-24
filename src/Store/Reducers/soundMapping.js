import { SOUNDMAPPING } from "../Actions/types"

export default function reducer(state = null, action) {
  switch (action.type) {
    case SOUNDMAPPING.MODE_UPDATE:
      return {
        ...state,
        mode: action.payload,
      }
    default:
      return state
  }
}
