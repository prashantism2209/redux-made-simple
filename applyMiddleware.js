const { compose } = require("./compose");

module.exports.applyMiddleware = (...middlewares) => {
  return createStore => {
    console.log("applyMiddleware => createStore");
    return (reducers, preLoadInitial, enhancer) => {
      console.log("applyMiddleware => reducers,preLoadInitial,enhancer");
      let store = createStore(reducers, preLoadInitial, enhancer);

      let originalDispatch = store.dispatch;

      let api = {
        getState: () => {
          console.log("applyMiddleware => getState");
          return store.getState();
        } /* wrapper over getState method of store */,
        dispatch: action => {
          console.log("applyMiddleware => dispatch");
          return originalDispatch(action);
        } /* wrapper over originalDispatch of store */
      };
      let chains = middlewares.map(middleware => {
        console.log("applyMiddleware => middleware ");
        return middleware(api); /* aState(api) , bState(api) , cState(api) */
      }); /* [ aNext,bNext,cNext ] */
      let dispatch = compose(...chains)(originalDispatch); /* aAction */
      return {
        ...store,
        dispatch
      } /* store with dispatch set to first middleware action method  */;
    };
  };
};
