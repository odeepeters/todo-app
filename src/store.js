// store.js
import { createStore } from 'redux';
import todoReducer from './Reducers/todoReducer';

const store = createStore(todoReducer);

export default store;
