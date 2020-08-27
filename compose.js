const compose = (...funcs) => {
  let last = funcs[funcs.length - 1]; /* cNext */
  let rest = funcs.slice(0, funcs.length - 1); /* [aNext , bNext ]*/
  return (args /* originalDispatch of store */) => {
    return rest.reduceRight((output, input) => {
      console.log("compose");
      return input(output);
    }, last(args) /* cNext(originalDispatch) => cAction */); /* cNext(originalDispatch) => bNext(cAction) => aNext(bAction) => aAction */
  }; /* aAction */
};

module.exports.compose = compose;
