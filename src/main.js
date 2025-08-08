import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import BaseButton from './components/Layouts/BaseButton.vue'
import BaseDialog from './components/Layouts/BaseDialog.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


/* add icons to the library */
library.add(fas, far, fab)

const pinia = createPinia()
const app = createApp(App)

app.component('base-button', BaseButton)
app.component('base-dialog', BaseDialog)
app.component('font-awesome-icon', FontAwesomeIcon).use(pinia).use(router).mount('#app')
