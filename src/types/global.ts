export interface Card {
	id: number;
	title: string;
	description: string;
	isEditing: boolean;
}

export interface Column {
	id: number;
	title: string;
	cards: Card[];
	isEditing: boolean;
}
