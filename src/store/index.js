import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./ducks";
import rootSaga from "./sagas";

const middlewares = [];

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(
      applyMiddleware(...middlewares),
      console.tron.createEnhancer()
    )
  : applyMiddleware(...middlewares);

const store = createStore(reducer, composer);

sagaMiddleware.run(rootSaga);

export default store;
