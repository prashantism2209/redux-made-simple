const { applyMiddleware } = require("./applyMiddleware");

const a = function aState(state) {
  console.log("state => a");
  return function aNext(next) {
    console.log("next => a");
    return function aAction(action) {
      console.log("action => a");
      next(action);
    };
  };
};

const b = function bState(state) {
  console.log("state => b");
  return function bNext(next) {
    console.log("next => b");
    return function bAction(action) {
      console.log("action => b");
      next(action);
    };
  };
};

const c = function cState(state) {
  console.log("state => c");
  return function cNext(next) {
    console.log("next => c");
    return function cAction(action) {
      console.log("action => c");
      next(action);
    };
  };
};

const createStore = () => {
  console.log("index createStore");
  return {
    dispatch: action => {
      console.log("index original dispatch");
    },
    getState: () => {
      console.log("index original getState");
      return {};
    }
  };
};

const reducers = (reducer, initial, enhancer) => {
  console.log("index reducers");
};

let { getState, dispatch } = applyMiddleware(a, b, c)(createStore)(
  reducers
); /* getState, aAction */
if (dispatch) {
  dispatch("a");
}
