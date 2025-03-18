import ResizeObserver from 'resize-observer-polyfill';
import { mount } from '@vue/test-utils';
import { describe, it, expect,test } from 'vitest';
import ColumnItem from '@/components/ColumnItem.vue';
import { ref } from 'vue';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createVuetify } from 'vuetify/lib/framework.mjs';

const vuetify = createVuetify({
	components, directives
})

window.ResizeObserver = ResizeObserver;

const column = {
  id: 1,
  title: 'Test Column',
  cards: [],
  isEditing: false,
}

describe('ColumnItem.vue', () => {
  it('renders column title', () => {
    const wrapper = mount(ColumnItem, {
      props: {
        'model-value': {...column},
      },
      global: {
        plugins: [vuetify],
      }
    });
    expect(wrapper.text()).toContain('Test Column');
  });

  it('allows editing column title', async () => {
 const wrapper = mount(ColumnItem, {
      props: {
        'model-value': {...column},
      },
      global: {
        plugins: [vuetify],
      }
    });
    
    await wrapper.find('#edit-column').trigger('click'); 
    const input = wrapper.find('#edit-column-title');
    await input.setValue('Updated Title');
    await wrapper.find('#save-column').trigger('click'); 
    expect(wrapper.find('#column-title').text()).toBe('Updated Title');
  });
});
