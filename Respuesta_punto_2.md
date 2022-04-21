<h1>Ejercicio 2:</h1>

<h2> 2.1) ¿Cómo implementarías las acciones del frontend utilizando redux? (por
ejemplo autenticación, solicitud de clientes activos para el usuario y
solicitud de casos por cliente)
</h2>

<h4>* Lo primero que haria es instalar <a href='https://reactrouter.com/docs/en/v6/getting-started/installation' >react-redux</a> utilizando npm install @reduxjs/toolkit react-redux </h4>
<h4>* Luego defino un redux store</h4>
            import { configureStore } from '@reduxjs/toolkit'
            import clientReducer from '../features/client/clientSlices'

            export default configureStore({
                reducer: {
                    client: clientReducer
                },
            })

<h4>* Luego envuelvo el componente que contenga la app con el Provider</h4>

            import App from './App'
            import store from './app/store'
            import { Provider } from 'react-redux'

            // As of React 18
            const root = ReactDOM.createRoot(document.getElementById('root'))

            root.render(
            <Provider store={store}>
                <App />
            </Provider>
            )
<h4>* Luego defino el slice con las acciones </h4>

            import { createSlice } from '@reduxjs/toolkit'

            export const clientSlice = createSlice({
            name: 'client',
            initialState: {
                token: '',
                botList: [],
                search:[]
            },
            reducers: {
                login: (state, action) => {
                    try {
                        const res = await axios.post('https://admindev.inceptia.ai/api/v1/login/', {
                                    "email": "reactdev@iniceptia.ai",
                                    "password": "4eSBbHqiCTPdBCTj",
                                })
                        state.token = res.data.token;        
                    } catch (error) {
                        console.log(error);
                    }                    
                },
                
            },
            })

            // Action creators are generated for each case reducer function
            export const { login } = clientSlice.actions

            export default clientSlice.reducer

<h2>
2.2) Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías
el index.js?
</h2>
    <h4>* Lo primero que haria es instalar <a href='https://reactrouter.com/docs/en/v6/getting-started/installation' >react-router-dom</a></h4>
    <h4>* Luego envolveria en la etiqueta BrowserRouter a el componente principal que contendra las rutas( app.jsx )</h4>
    <h4>* Definiria las rutas de la siguiente manera</h4>

            <Routes>
                <Route path="/" element={<BotList />} />
                <Route path="about" element={<ExtraRoute />} />
                <Route path="*" element={<404 Route />} />
            </Routes>
    

    
