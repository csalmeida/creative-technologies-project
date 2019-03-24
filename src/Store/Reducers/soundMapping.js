import { SOUNDMAPPING } from "../Actions/types"

export default function reducer(state = null, action) {
  switch (action.type) {
    case SOUNDMAPPING.MODE_UPDATE:
      return {
        ...state,
        mode: action.payload,
      }
    case SOUNDMAPPING.SYNTHCOMP_TRANSPORT_TOGGLE:
      return {
        ...state,
        transport: !state.transport,
      }
    default:
      return state
  }
}
