import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import localforage from "localforage";

import reducers from "./reducer";
import rootSaga from "./saga";

const persistConfig = {
  key: "root",
  storage: localforage,
  stateReconciler: autoMergeLevel2,
  debug: false,
  blacklist: ["loading", "reset", "settings", "products", "customers", "customerProducts"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {
    store,
    persistor,
  };
};

const { store, persistor } = configureStore();
export { store, persistor };
