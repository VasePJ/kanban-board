import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { VApp, VBtn, VCard, VTextField, VTextarea,VList, VIcon } from 'vuetify/components';

export default createVuetify({
  components: {
    VApp, VBtn, VCard, VTextField, VTextarea, VList, VIcon
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark',
  },
});
