import { mount } from '@vue/test-utils';
import ResizeObserver from 'resize-observer-polyfill';

import { describe, it, expect, vi } from 'vitest';
import CardItem from '../components/CardItem.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({ components, directives });

window.ResizeObserver = ResizeObserver;

describe('CardItem.vue', () => {
  const card = {
    id: 1,
    title: 'Test Card',
    description: 'This is a test card.',
    isEditing: false,
  };

  it('renders card title and description when not in edit mode', () => {
    const wrapper = mount(CardItem, {
      props: {
        'model-value': {...card},
      },
      global: {
        plugins: [vuetify],
      }
    });

    expect(wrapper.find('#card-title').text()).toBe(card.title);
    expect(wrapper.find('#card-description').text()).toBe(card.description);
    expect(wrapper.find('#edit-title').exists()).toBe(false);
    expect(wrapper.find('#edit-description').exists()).toBe(false);
  });

  it('enters edit mode when the edit button is clicked', async () => {
    const wrapper = mount(CardItem, {
      props: {
        'model-value': {...card},
      },
      global: {
        plugins: [vuetify],
      }
    });

    await wrapper.find('#edit-card').trigger('click');
    expect(wrapper.find('#edit-title').exists()).toBe(true);
    expect(wrapper.find('#edit-description').exists()).toBe(true);
  });

  it('emits save event with updated card data when save button is clicked', async () => {
    const wrapper = mount(CardItem, {
      props: {
        'model-value': {...card},
      },
      global: {
        plugins: [vuetify],
      }
    });

    // await wrapper.find('#save-card').trigger('click');
    await wrapper.find('#edit-card').trigger('click');
    const newTitle = 'Updated Card Title';
    const newDescription = 'Updated Card Description';

    await wrapper.find('#edit-title').setValue(newTitle);
    await wrapper.find('#edit-description').setValue(newDescription);
    await wrapper.find('#save-card').trigger('click');

    const emitted = wrapper.emitted('save');
    expect(emitted).toBeTruthy();
  });

  it('emits cancel event and reverts changes when cancel button is clicked', async () => {
    const wrapper = mount(CardItem, {
      props: {
        'model-value': {...card},
      },
      global: {
        plugins: [vuetify],
      }
    });

    await wrapper.find('#edit-card').trigger('click');
    await wrapper.find('#edit-title').setValue('Temporary Title');
    await wrapper.find('#cancel-edit').trigger('click');

    expect(wrapper.emitted('cancel')).toBeTruthy();
    expect(wrapper.find('#card-title').text()).toBe(card.title);
    expect(wrapper.find('#card-description').text()).toBe(card.description);
  });

  it('emits delete event with card id when delete button is clicked', async () => {
    const wrapper = mount(CardItem, {
      props: {
        'model-value': {...card},
      },
      global: {
        plugins: [vuetify],
      }
    });

    await wrapper.find('#delete-card').trigger('click');
    const emitted = wrapper.emitted('delete');
    expect(emitted).toBeTruthy();
    if (emitted && emitted.length > 0) {
      expect(emitted[0][0]).toBe(card.id);
    }
  });
});
