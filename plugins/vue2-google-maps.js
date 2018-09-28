import Vue from 'vue';
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps';
import credentials from '@/assets/js/credentials.js';
 
Vue.use(VueGoogleMaps, {
  load: {
    key: credentials.gmap_key
  },
})

