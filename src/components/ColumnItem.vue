<template>
	<v-col
		cols="auto"
		class="kanban-column"
	>
		<v-card class="pa-4 d-flex flex-column ga-4" elevation="2">
			<template v-if="!column.isEditing">
				<v-card-title class="d-flex">
					<h2 id="column-title" class="flex-grow-1">{{ column.title }}</h2>
					<v-card-actions class="d-flex flex-row justify-space-between">
						<v-btn id="edit-column" size="small" color="primary" class="mr-4" @click="editColumn()">
							<v-icon size="20">mdi-pencil</v-icon>
						</v-btn>
						<v-btn size="small" color="error" @click="deleteColumn(column.id)">
							<v-icon size="20">mdi-delete</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card-title>
				<v-btn id="add-card" color="orange-darken-2" size="small" @click="addCard()" class="add-card-btn">
					<v-icon size="20" class="mr-2">mdi-plus</v-icon>
				Add Card
				</v-btn>
			</template>
			<template v-else>
				<v-card-title>
					<v-text-field id="edit-column-title" v-model="columnEditTitle" :rules="[requiredRule]"  ref="columnTitle" label="Edit Column Title" />
				</v-card-title>
				<v-card-actions class="d-flex flex-row">
					<v-btn id="save-column" size="small" color="success" class="mr-4" @click="saveColumn()">
					<v-icon icon="mdi-checkbox-marked-circle" class="mr-2"></v-icon>
					Save
				</v-btn>
					<v-btn id="cancel-column" size="small" color="secondary" @click="cancelEditColumn()">
					<v-icon icon="mdi-minus-circle" class="mr-2"></v-icon>
					Cancel
				</v-btn>
				</v-card-actions>
			</template>
			<draggable
				v-model="column.cards"
				group="cards"
				item-key="id"
				class="drag-area"
			>
			<template #item="{ _, index }">
				<CardItem
					v-model="column.cards[index]"
					:cardIndex="index"
					@delete="deleteCard"
				/>
			</template>
			</draggable>
			<CardItem v-if="isNewCard"
				v-model="newCard"
				:cardIndex=0
				@save="saveCard"
				@cancel="cancelNewCard"
			/>
		</v-card>
	</v-col>
</template>

<script setup lang="ts">

import draggable from 'vuedraggable';
import { Card, Column } from '../types/global';
import CardItem from './CardItem.vue';
import { ref } from 'vue';
import { VTextField } from 'vuetify/lib/components/index.mjs';

const requiredRule = (v) => !!v || 'Field is required';
const columnTitle = ref<VTextField | null>(null);

const column = defineModel<Column>({ default: () => ({id: 0, title: '', cards: [], isEditing: false }) });
const emit = defineEmits<{
	(e: 'delete', id: number): void
	(e: 'save'): void
	(e: 'cancel'): void
}>()

let newCard = ref<Card>({
	id: Date.now(),
	title: '',
	description: '',
	isEditing: true
});

const isNewCard = ref<boolean>(false);

const columnEditTitle = ref<string>('');

const editColumn = () => {
	columnEditTitle.value = column.value.title;
	column.value.isEditing = true;
};

const saveColumn = () => {
	columnTitle.value?.validate()
		.then((errors) => {
		if (errors.length === 0) {
			column.value.title = columnEditTitle.value;
			column.value.isEditing = false;
			emit('save');
		}
	});
	
};

const cancelEditColumn = () => {
  column.value.isEditing = false;
  emit('cancel');
};

const deleteColumn = (id: number) => {
	emit('delete', id );
};

const addCard = () => {
	newCard.value = {
		id: Date.now(),
		title: '',
		description: '',
		isEditing: true
	};
  isNewCard.value = true;
};

const saveCard = () => {
	column.value.cards.push(newCard.value);
	isNewCard.value = false;
}

const cancelNewCard = () => {
	isNewCard.value = false;
}

const deleteCard = (cardId: number) => {
  column.value.cards = column.value.cards.filter(card => card.id !== cardId);
};
</script>

<style scoped>
.kanban-column {
	width: 350px;
}
</style>
