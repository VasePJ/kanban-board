<template>
	<v-list-item>
		<v-layout>
			<v-card class="mb-4 mx-auto pa-3 d-flex flex-column align-stretch ga-3 card-item" elevation="2">
				<template v-if="!card.isEditing">
					<v-card-title>
						<h3 id="card-title">{{ card.title }}</h3>
					</v-card-title>
					<v-card-text>
						<span id="card-description">{{ card.description }}</span>
					</v-card-text>
					<v-card-actions class="flex flex-row">
						<v-btn size="small" id="edit-card" color="primary" class="mr-4" @click="editCard()"> 
							<v-icon size="20" class="mr-4">mdi-pencil</v-icon>
								Edit
						</v-btn>
						<v-btn id="delete-card" size="small" color="error" @click="deleteCard(card.id)">
							<v-icon size="20">mdi-delete</v-icon>
								Delete
						</v-btn>
					</v-card-actions>
				</template>
				<template v-else>
					<v-card-title>
						<v-text-field id="edit-title" v-model="cardEdit.title" label="Edit Title"  :rules="[requiredRule]"  ref="cardTitle"/>
					</v-card-title>
					<v-card-text>
						<v-textarea id="edit-description" v-model="cardEdit.description" label="Edit Description" />
					</v-card-text>
					<v-card-actions class="flex flex-row">
						<v-btn id="save-card" size="small" color="success" class="mr-4" @click="saveCard()">
							<v-icon icon="mdi-checkbox-marked-circle" class="mr-2"></v-icon>
							Save
						</v-btn>
						<v-btn id="cancel-edit" size="small" color="secondary" @click="cancelEditCard()">
							<v-icon icon="mdi-minus-circle" class="mr-2"></v-icon>
							Cancel
						</v-btn>
					</v-card-actions>
				</template>
			</v-card>
		</v-layout>
	</v-list-item>
</template>

<script setup lang="ts">
import { Card } from '@/types/global';
import { ref } from 'vue';
import { VTextField } from 'vuetify/lib/components/index.mjs';

const emit = defineEmits<{
	(e: 'delete', id: number): void
	(e: 'save'): void
	(e: 'cancel'): void
}>()


const requiredRule = (v) => !!v || 'Field is required';
const cardTitle = ref<VTextField | null>(null);

const card = defineModel<Card>({ default: () => ({ id: 0, title: '', description: '', isEditing: false }) });
const cardEdit = ref<Card>({ id: 0, title: '', description: '', isEditing: false });

const editCard = () => {
	cardEdit.value = { ...card.value };
	card.value.isEditing = true;
};

const saveCard = () => {
	cardTitle.value?.validate()
		.then((errors) => {
		if (errors.length === 0) {
		card.value.title = cardEdit.value.title;
		card.value.description = cardEdit.value.description;
		card.value.isEditing = false;
		emit('save');
	}
	})
};

const cancelEditCard = () => {
	card.value.isEditing = false;
	emit('cancel');
};
const deleteCard = (id: number) => {
	emit('delete', id );
};
</script>

<style scoped>
.card-item:hover {
	transform: scale(1.02);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>