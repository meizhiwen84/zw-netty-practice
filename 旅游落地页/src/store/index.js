import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
// import sagaMonitor from '../sagaMonitor'

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  if (process.env.NODE_ENV === 'development') {
    return {
      ...createStore(rootReducer, applyMiddleware(sagaMiddleware, logger)),
      runSaga: sagaMiddleware.run
    }
  } else {
    return {
      ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
      runSaga: sagaMiddleware.run
    }
  }
}
