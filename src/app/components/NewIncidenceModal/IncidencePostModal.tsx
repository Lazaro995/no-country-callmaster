import React from "react";
import Button from "@/app/components/Button";
import Textarea from "../Textarea";
import Input from "../Input";
import { IncidencePostModalProps } from "@/props/IncidencePostModalProps";
import { capitalize } from "@/utils/functions/capitalize";
import { generateColumns } from "@/utils/functions/GenerateColumnsTable";
import Section from "./FormSections";
import ClientsForm from "./ClientsForm";
import ServicesForm from "./ServicesForm";
import DetailsForm from "./DetailsForm";

const IncidencePostModal = ({
	formData,
	statuses,
	cambio,
	handleDecline,
	handleFormSubmit,
	handleInputChange,
}: IncidencePostModalProps) => {
	console.log(formData);
	const columns = generateColumns(formData);
	console.log(columns);

	return (
		// El onClick en este div cierra el modal
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={handleDecline}>
			{/* Se evita que el clic en el contenido se propague y cierre el modal */}
			<div
				className="bg-background1 dark:bg-background3 p-6 rounded-lg w-full max-w-[90%] shadow-lg"
				onClick={(e) => e.stopPropagation()}>
				<h2 className="text-xl font-bold font-montserrat text-primary3 mb-4">
					Agregar nueva incidencia
				</h2>
				<form onSubmit={handleFormSubmit} className='grid grid-cols-2 gap-4'>
					<div>
						<Section title='Datos del cliente'>
							<ClientsForm
								formData={formData}
								handleInputChange={handleInputChange}
							/>
						</Section>
					</div>
					<div>
						<Section title='Servicio'>
							<ServicesForm
								formData={formData}
								handleInputChange={handleInputChange}
							/>
						</Section>
					</div>

					<div>
						<Section title='Detalles de la incidencia'>
							<DetailsForm
								formData={formData}
								handleInputChange={handleInputChange}
							/>
						</Section>
					</div>
					<div>
						<Section title='Descripción'>
							<Textarea
								nombre='Descripción'
								cambio={cambio}
								value={formData["descripcion"] || ""}
							/>
						</Section>

					</div>
					<div>
						<Section title='Fecha de creacion'>
							<Input
								inputType='date'
								nombre='Fecha de creacion'
								value={formData.fechaAlta || ""}
								cambio={handleInputChange}
							/>
						</Section>
					</div>
					<div className='flex justify-end gap-2'>
						<Button
							type='button'
							buttonName='Cancel'
							disableOptions={false}
							handler={handleDecline}
						/>
						<Button type='submit' buttonName='Save' disableOptions={false} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default IncidencePostModal;
