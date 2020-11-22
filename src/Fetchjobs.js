import { useReducer, useEffect } from "react";
import axios from "axios";
const initialState = { jobs: [], loading: true };
const Base_URL =
  "https://api.allorigins.win/raw?url=https://jobs.github.com/positions.json";
const Actions = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

function reducer(state, action) {
  switch (action.type) {
    case Actions.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case Actions.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case Actions.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    default:
      return state;
  }
}

export default function Fetchjobs(params, page) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: Actions.MAKE_REQUEST });
    axios
      .get(Base_URL, {
        cancelToken: cancelToken.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: Actions.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: Actions.ERROR, payload: { error: e } });
      });
    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);

  return state;
}
