import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.css';

/* Vendor CSS Files */
import "@/assets/vendor/fontawesome-free/css/all.min.css";
import "@/assets/vendor/animate.css/animate.min.css";
import "@/assets/vendor/bootstrap/css/bootstrap.min.css";
import "@/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/assets/vendor/boxicons/css/boxicons.min.css";
import "@/assets/vendor/glightbox/css/glightbox.min.css";
import "@/assets/vendor/remixicon/remixicon.css";
import "@/assets/vendor/swiper/swiper-bundle.min.css";
/* Template Main CSS File */
import "@/assets/css/style.css";

/* SCRIPTS */
import 'bootstrap/dist/js/bootstrap.js';
//import "@/assets/vendor/purecounter/purecounter_vanilla.js";
//import "@/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
//import "@/assets/vendor/glightbox/js/glightbox.min.js";
//import "@/assets/vendor/swiper/swiper-bundle.min.js";
//import "@/assets/vendor/php-email-form/validate.js";


const app = createApp(App).use(router);

/* VARIBLES GLOBALES */
//const BASE_URL = "http://" + window.location.host + "/";
const BASE_URL = "https://checkmedical.laschelitass.com/";
app.provide('BASE_URL', BASE_URL);

//const BASE_URL_AXIOS = BASE_URL.replace('8081', '8080');
const BASE_URL_AXIOS = 'https://checkmedicalback-production.up.railway.app/';
app.provide('BASE_URL_AXIOS', BASE_URL_AXIOS);
/* END VARIBLES GLOBALES */


/* AXIOS */
import axios from 'axios';
// eslint-disable-next-line vue/multi-word-component-names
app.component('Axios', axios);
//Window.axios = require('axios')
/* END AXIOS */


/* CRYPTOJS */
import CryptoJS from 'crypto-js';
app.component('CryptoJS', CryptoJS);
/* END CRYPTOJS */


app.mount('#app');
