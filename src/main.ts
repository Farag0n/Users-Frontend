//este archivo es el punto de arranque el que carga la app, carga el componente raiz App.vue
//es como el program de C# para que me entiendas migue del futuro
import { createApp } from 'vue' //Se importa la funcion que crea la instancia de vue
import './style.css' //importa estilos globales, estos afectan a toda la app
import {router} from "./router" //importa router que es lo que permite la navegacion por rutas para SPA
import App from './App.vue' //se importa el componente raiz

//esto es lo que crea y monta la app
createApp(App)
.use(router)//se registra el plugin global
.mount('#app')//montar la app en el DOM
