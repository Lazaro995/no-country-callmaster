type Handler = {
	apiUrl: string;
	id: string;
}

type Status = {
	uid: string;
	name: string;
};

export type Column = {
	name: string;
	uid: string;
	sorteable?: boolean;
}
// Data genérico para aceptar diferentes estructuras
export type Data<T = Record<string, any>> = T;

export type TableProps<T = Record<string, any>> = {
	initialVisibleColumns: string[];
	statuses: Status[];
	sortable?: string[];
	data: Data<T>[];
	columns?: Column[];
	actions?: boolean;
	viewClick?: (id: string) => void;
	editClick?: (id: string) => void;
	deleteClick?: (id: string) => void;
	handleAddClick?: () => void;
	modalPost?: React.ReactNode;
}