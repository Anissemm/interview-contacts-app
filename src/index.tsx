import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './store'
import { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

const root = createRoot(document.getElementById('root')!)
root.render(
    <StoreProvider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </StoreProvider>
)