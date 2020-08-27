# redux-made-simple

Simple and easy to understand implementation of Redux function for learning

_Note : not an exact redux method implementation but a simpler version_

## methods

- [applyMiddleware](applyMiddleware.js) - Middleware lets you extend Redux with custom functionality.
- [compose](./compose.js) - Composes functions from right to left.
- [combineReducers](./combineReducers.js) - Function turns an object whose values are different reducing functions into a single reducing function.

## example

- applyMiddleware

```ecmascript 6

const {applyMiddleware} = require('./applyMiddleware');

const a = function aState(state) {
    console.log("state => a");
    return function aNext(next) {
        console.log("next => a");
        return function aAction(action) {
            console.log("action => a");
             next(action);
        }
    }
};

const b = function bState(state) {
    console.log("state => b");
    return function bNext(next) {
        console.log("next => b");
        return function bAction(action) {
            console.log("action => b");
            next(action);
        }
    }
};

const c = function cState(state) {
    console.log("state => c");
    return function cNext(next) {
        console.log("next => c");
        return function cAction(action) {
            console.log("action => c");
            next(action);
        }
    }
};

const createStore = () => {
  console.log("index createStore");
  return {
      dispatch: (action) => {
          console.log("index original dispatch");
      },
      getState : () => {
          console.log("index original getState");
          return {};
      }};
};

const reducers = (reducer,initial,enhancer)=> {
    console.log("index reducers");
};

let {getState,dispatch} = applyMiddleware(a,b,c)(createStore)(reducers); /* getState, aAction */
if(dispatch){
    dispatch("a");
}

```

- combineReducers

```ecmascript 6

const {combineReducers} = require('./combineReducers');

const firstReducer = (state = {},action ) => {
    switch (action.type) {
        case 'f':
            return Object.assign({},state,{
                key: 'f'
            });
        case 'ff':
            return Object.assign({},state,{
                key: 'ff'
            });
        default : return state;
    }
};

const secondReducer = (state = {},action ) => {
    switch (action.type) {
        case 's':
            return Object.assign({},state,{
                key: 's'
            });
        case 'ss':
            return Object.assign({},state,{
                key: 'ss'
            });
        default : return state;
    }
};

const rootReducer = combineReducers({firstReducer,secondReducer});
let state = {'key':''};
console.log("initial state => ", state);
state = rootReducer(state,{type:"f"});
console.log("after first update => ",state);
state = rootReducer(state,{type:"ff"});
console.log("after second update => ",state);
state = rootReducer(state,{type:"s"});
console.log("after third update => ",state);
```
