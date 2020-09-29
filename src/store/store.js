import { createStore } from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

import { rootReducer } from "./reducers";

export const config = {
    key: 'root',
    storage: storage
};
const persisted = persistReducer(config, rootReducer);

const store = createStore(
  persisted,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
