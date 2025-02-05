"use client";

import { use, useEffect, useState } from "react";
import useTicketsStats from "@/hooks/useTicketsStats";
import StatisticsSummary from "./components/StatisticsSummary";
import TicketsTable from "./components/TicketsTable";
import withAuth from "./components/WithAuth";
import useIncidenceStore from "@/stores/incidenceStore";
import { users } from "@/utils/Data/data";
import Table from "./components/Table/Table";
import handlerViewClick from "@/utils/functions/handlerViewClick";
import { Data } from "@/props/tableProps";
import Notifications from "./components/Notifications/Notifications";
import { users2 } from "@/utils/Data/data2";
import handlerDeleteClick from "@/utils/functions/handlerDeleteClick";
import handlerEditClick from "@/utils/functions/handlerEditClick";
import { Incidence, PostIncidenceProps } from "@/props/IncidenceProps";
import IncidencePostModal from "./components/NewIncidenceModal/IncidencePostModal";

const columnas = [
	{name: "Nombre", uid: "name", sortable: true },
	{name: "Estado", uid: "status" },
	];

const Dashboard = () => {
	const initialState = {
		id: 0,
		idCliente: "",
		cliente: {
			id: 0,
			nombre: "",
			apellido: "",
			dni: 0,
			correo: "",
			telefono: "",
			estado: "",
		},
		servicio: {
			id: 0,
			nombre: "",
			descripcion: "",
		},
		descripcion: "",
		fechaDeAlta: "",
		detalles: [
			{
				idEmpleado: 0,
				nombreEmpleado: "",
				apellidoEmpleado: "",
				fechaDeModificacion: "",
				descripcion: "",
				estado: "",
				prioridad: "",
			},
		],
	};
	// Hook personalizado para obtener datos de estadísticas y tickets
	const { stats, recentTickets } = useTicketsStats();
	//?const { user } = useAuthStore(); user en el estado global.
	// Estado para manejar la estadística seleccionada
	const [selectedState, setSelectedState] = useState<string | null>(null);
	const [showNotifications, setShowNotifications] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [formData, setFormData] = useState(initialState);

	// Función para manejar clics en las tarjetas de estadísticas
	const handleCardClick = (state: string) => {
		setSelectedState(state);
		setShowNotifications(!showNotifications);
	};

	const { incidences, getIncidences, postIncidences } = useIncidenceStore();
	const detalles = incidences.map((incidence) => incidence.detalles);
	useEffect(() => {
		getIncidences();
	}, []);
	console.log(incidences);

	const handleModalInputAndTextareaChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (formData) {
			postIncidences(formData as Incidence);
		} else {
			console.error("FormData is undefined");
		}

		setModalOpen(false);
		setFormData(initialState);
	};
	const handleDeclineForm = () => {
		setModalOpen(false);
		setFormData(initialState);
	};

	const handleViewClick = async (id: string) => {
		const apiUrlForIncidences = process.env.apiForIncidence || "";
		await handlerViewClick(apiUrlForIncidences, id);
	};
	const handleDeleteClick = async (id: string) => {
		const apiUrlForIncidences = process.env.apiForIncidence || "";
		await handlerDeleteClick(apiUrlForIncidences, id);
	};
	const handleEditClick = async (id: string) => {
		const apiUrlForIncidences = process.env.apiForIncidence || "";
		await handlerEditClick(apiUrlForIncidences, id);
	};

	return (
		<section className='flex flex-grow max-w-[calc(100vw-50px)] overflow-hidden min-h-screen bg-background1 text-primary3 dark:bg-background3 dark:text-primary2'>
			{/* Modal adicion de incidencia*/}
			{modalOpen && (
				<IncidencePostModal
					handleInputChange={handleModalInputAndTextareaChange}
					formData={formData}
					statuses={[
						{ uid: "active", name: "Active" },
						{ uid: "paused", name: "Paused" },
						{ uid: "vacation", name: "Vacation" },
					]}
					cambio={handleModalInputAndTextareaChange}
					handleFormSubmit={handleFormSubmit}
					handleDecline={handleDeclineForm}
				/>
			)}

			{/* Notificaciones dentro del layout */}
			<Notifications />

			{/* Contenedor Principal */}
			<div className='flex flex-col flex-grow w-full px-6 py-4 overflow-hidden'>
				{/* Título de la página */}
				<h1 className='text-3xl font-bold text-primary1 dark:text-primary2 mb-6'>
					Dashboard y Reportes
				</h1>

				{/* Sección de Estadísticas */}
				<StatisticsSummary stats={stats} onCardClick={handleCardClick} />

				{/* Tabla de Tickets según el estado seleccionado */}
				{selectedState && recentTickets[selectedState] && (
					<div className='mt-6'>
						<h2 className='text-xl font-semibold mb-4 text-accent1 dark:text-accent3'>
							Tickets: {selectedState}
						</h2>
						<TicketsTable tickets={recentTickets[selectedState]} />
					</div>
				)}

				{/* Separador Visual */}
				<hr className='my-8 border-secondary1' />

				{/* Sección de Reportes */}
				<div className='w-full flex-grow'>
					<h1 className='text-2xl font-bold mb-4 text-primary1 dark:text-primary2'>
						Reportes
					</h1>
					<p className='text-secondary1'>
						Bienvenido a la sección de reportes.
					</p>

					{/* 🔥 Contenedor de la Tabla Ajustado */}
					<div className='max-w-full overflow-x-auto'>
						<div className='min-w-[800px]'>
							<Table
								columns={columnas}
								sortable={["name", "status"]}
								data={detalles}
								initialVisibleColumns={["all"]}
								statuses={[
									{ uid: "active", name: "Active" },
									{ uid: "paused", name: "Paused" },
									{ uid: "vacation", name: "Vacation" },
								]}
								viewClick={handleViewClick}
								editClick={handleEditClick}
								deleteClick={handleDeleteClick}
								actions={true}
								handleAddClick={() => setModalOpen(true)}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
		// </div>
	);
};
export default withAuth(Dashboard);
