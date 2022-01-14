import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware()

export function configureStore(initialState) {
   const store = createStore(
      reducers,
      initialState,
      applyMiddleware(sagaMiddleware)
   );
   sagaMiddleware.run(sagas);
   return store;
}
