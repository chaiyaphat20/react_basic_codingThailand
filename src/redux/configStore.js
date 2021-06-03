// configureStore.js

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "../redux/reducers/index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartState"], //เลือกว่าจะเก็บอันไหน
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configStore = () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
      // other store enhancers if any
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configStore;
