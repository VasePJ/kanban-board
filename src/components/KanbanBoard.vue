<template>
	<KanbanHeader />
	<v-container class="pa-5 d-flex flex-grow-1 flex-row ga-4 overflow-x-auto">
		<v-row class="d-flex flex-nowrap ga-4" no-gutters>
			<template v-for="(_, columnIndex) in columns" :key="columnIndex">
				<ColumnItem
					v-model="columns[columnIndex]"
					@delete="deleteColumn"
				/>
			</template>
			<ColumnItem
				v-if="isNewColumn"
				v-model="newColumn"
				@save="saveColumn"
				@cancel="cancelNewColumn"
			/>
			<v-col cols="auto">
				<v-btn size="small" @click="addColumn">
					<v-icon size="20" class="mr-2">mdi-plus</v-icon>
					Add status column
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import 	KanbanHeader from './KanbanHeader.vue';
import ColumnItem from './ColumnItem.vue';
import { Column } from '../types/global';

let columns = reactive<Column[]>([]);
const isNewColumn = ref<boolean>(false);

let newColumn = ref<Column>({
	id: Date.now(),
	title: '',
	cards:[],
	isEditing: true,
});


const addColumn = () => {
	newColumn.value = {
		id:Date.now(),
		title: '',
		cards: [],
		isEditing: true
	};
	isNewColumn.value = true;
};

const deleteColumn = (columnId: number) => {
	const index = columns.findIndex(column => column.id === columnId);
	if (index !== -1) {
		columns.splice(index, 1);
	}
};

const saveColumn = () => {
	columns.push(newColumn.value);
	isNewColumn.value = false;
}

const cancelNewColumn = () => {
	isNewColumn.value = false;
}

</script>
