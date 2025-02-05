"use client";
import React from "react";
import {
	Table as HerouiTable,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,

	Pagination,
	Selection,
	ChipProps,
	SortDescriptor,
} from "@heroui/react";

import { SearchIcon } from "./SearchIcon";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { capitalize } from "@/utils/functions/capitalize";
import { TableProps, Data } from "@/props/tableProps";
import { generateTableColumns } from "@/utils/functions/GenerateColumnsTable";

 

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};
const Table = ({
	initialVisibleColumns,
	sortable ,
	statuses,
	data,
	actions,
	editClick,
	viewClick,
	deleteClick,
	handleAddClick,
	modalPost
}: TableProps) => {
	//?iinitialVisibleColumns  indica un array de strings que representan las columnas visibles  de la tabla al iniciar la aplicación
	/* 
La propiedad status recibe un array de objetos con las propiedades uid y name. Estas propiedades se utilizan para identificar y mostrar el estado de la fila en la tabla.
	statuses={[
						{ uid: "active", name: "Active" }, cambiar el nombre en funcion de lo que se desea mostrar, el uid asigna el color
						{ uid: "paused", name: "Paused" },
						{ uid: "vacation", name: "Vacation" },
					]} el valor active se muestra en verde, el valor paused se muestra en rojo y el valor vacation se muestra en amarillo.

La propiedad data recibe un json con la data a renderizar.

La propiedad DataProps recibe las props del data, ya que  pueden cambiar. 


*/

	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
		new Set([])
	);
	const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
		new Set(initialVisibleColumns)
	);
	const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
		column: "age",
		direction: "ascending",
	});
	const [page, setPage] = React.useState(1);

	const pages = Math.ceil(data.length / rowsPerPage);

	const hasSearchFilter = Boolean(filterValue);
	const columns = generateTableColumns(data, sortable || []);
    if (actions) columns.push({ name: "ACTIONS", uid: "actions", sortable: false });

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid)
		);
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredUsers = [...data];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		if (
			statusFilter !== "all" &&
			Array.from(statusFilter).length !== statuses.length
		) {
			filteredUsers = filteredUsers.filter((user) =>
				Array.from(statusFilter).includes(user.status)
			);
		}

		return filteredUsers;
	}, [data, filterValue, statusFilter]);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a: Data, b: Data) => {
			const first = a[sortDescriptor.column as keyof Data] as number;
			const second = b[sortDescriptor.column as keyof Data] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const renderCell = React.useCallback((data: Data, columnKey: React.Key) => {
		const cellValue = data[columnKey as keyof Data];

		switch (columnKey) {
			case "name":
				return <div className='flex flex-col'>{cellValue}</div>;
			case "role":
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-small capitalize'>{cellValue}</p>
						<p className='text-bold text-tiny capitalize text-default-500'>
							{data.team}
						</p>
					</div>
				);
			case "status":
				return (
					<Chip
						className='capitalize border-none gap-1 text-default-600'
						color={statusColorMap[data.status]}
						size='sm'
						variant='dot'>
						{cellValue}
					</Chip>
				);
			case "actions":
				return (
					<div className='relative flex justify-end items-center gap-2'>
						<Dropdown>
							<DropdownTrigger>
								<Button isIconOnly radius='full' size='sm' variant='light'>
									<VerticalDotsIcon className='text-default-400 ' />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem onClick={() => viewClick?.(data.id)} key='view'>
									View
								</DropdownItem>
								<DropdownItem onClick={() => editClick?.(data.id)} key='edit'>
									Edit
								</DropdownItem>
								<DropdownItem
									onClick={() => deleteClick?.(data.id)}
									key='delete'>
									Delete
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	const onRowsPerPageChange = React.useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setRowsPerPage(Number(e.target.value));
			setPage(1);
		},
		[]
	);

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						classNames={{
							base: "w-full sm:max-w-[44%]",
							inputWrapper: "border-1",
						}}
						placeholder='Search by name...'
						size='sm'
						startContent={<SearchIcon className='text-default-300' />}
						value={filterValue}
						variant='bordered'
						onClear={() => setFilterValue("")}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<Dropdown>
							<DropdownTrigger className='hidden sm:flex'>
								<Button
									endContent={<ChevronDownIcon className='text-small' />}
									size='sm'
									variant='flat'>
									Status
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label='Table Columns'
								closeOnSelect={false}
								selectedKeys={statusFilter}
								selectionMode='multiple'
								onSelectionChange={setStatusFilter}>
								{statuses.map((status) => (
									<DropdownItem key={status.uid} className='capitalize'>
										{capitalize(status.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Dropdown>
							<DropdownTrigger className='hidden sm:flex'>
								<Button
									endContent={<ChevronDownIcon className='text-small' />}
									size='sm'
									variant='flat'>
									Columns
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label='Table Columns'
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode='multiple'
								onSelectionChange={setVisibleColumns}>
								{columns.map((column) => (
									<DropdownItem key={column.uid} className='capitalize'>
										{capitalize(column.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Button
							onClick={handleAddClick}
							className='bg-foreground text-background'
							endContent={<PlusIcon />}
							size='sm'>
							Add New
						</Button>
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<span className='text-default-400 text-small'>
						Total {data.length} data
					</span>
					<label className='flex items-center text-default-400 text-small'>
						Rows per page:
						<select
							className='bg-transparent outline-none text-default-400 text-small'
							onChange={onRowsPerPageChange}>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='15'>15</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [
		filterValue,
		statusFilter,
		visibleColumns,
		onSearchChange,
		onRowsPerPageChange,
		data.length,
		hasSearchFilter,
	]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-between items-center'>
				<Pagination
					showControls
					classNames={{
						cursor: "bg-foreground text-background",
					}}
					color='default'
					isDisabled={hasSearchFilter}
					page={page}
					total={pages}
					variant='light'
					onChange={setPage}
				/>
				<span className='text-small text-default-400'>
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${items.length} selected`}
				</span>
			</div>
		);
	}, [selectedKeys, items.length, page, pages, hasSearchFilter]);

	const classNames = React.useMemo(
		() => ({
			wrapper: ["w-full", "max-w-full", "flex-grow", "overflow-auto"],
			th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
			td: [
				// changing the rows border radius
				// first
				"group-data-[first=true]/tr:first:before:rounded-none",
				"group-data-[first=true]/tr:last:before:rounded-none",
				// middle
				"group-data-[middle=true]/tr:before:rounded-none",
				// last
				"group-data-[last=true]/tr:first:before:rounded-none",
				"group-data-[last=true]/tr:last:before:rounded-none",
			],
		}),
		[]
	);

	return (
		<HerouiTable
			aria-label='Example table with custom cells, pagination and sorting'
			bottomContent={bottomContent}
			bottomContentPlacement='outside'
			checkboxesProps={{
				classNames: {
					wrapper: "after:bg-foreground after:text-background text-background",
				},
			}}
			classNames={classNames}
			selectedKeys={selectedKeys}
			selectionMode='multiple'
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement='outside'
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No data found"} items={sortedItems}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</HerouiTable>
	);
};
export default Table;
