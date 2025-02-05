import React from "react";
import Input from "../Input";
import Textarea from "../Textarea";
import { PostIncidenceProps } from "@/props/IncidenceProps";

const DetailsForm = ({
	formData,
	handleInputChange,
}: {
	formData: PostIncidenceProps;
	handleInputChange: (field: string, value: string) => void;
}) => {
	return (
		<div className="grid grid-cols-2 gap-4 p-4 bg-background1 border border-secondary1 rounded-md shadow-md">
			<Input
				nombre='Código de empleado'
				inputType='number'
				cambio={handleInputChange}
				value={formData.idEmpleado || ""}
			/>
			<Input
				nombre='Nombre de empleado'
				inputType='text'
				cambio={handleInputChange}
				value={formData.nombreEmpleado || ""}
			/>
			<Input
				nombre='Apellido de empleado'
				inputType='text'
				cambio={handleInputChange}
				value={formData.apellidoEmpleado || ""}
			/>
			<Input
				nombre='Fecha de modificacion'
				inputType='date'
				cambio={handleInputChange}
				value={formData.fechaDeModificacion || ""}
			/>
			<Textarea
				nombre='Descripción'
				cambio={handleInputChange}
				value={formData.descripcion || ""}
			/>
			<div className="flex flex-col gap-2">

				<select
					className="w-full h-10 border border-secondary1 bg-background2 p-2 rounded font-montserrat text-primary3 text-sm"
					value={formData.estado || ""}
					onChange={(e) => handleInputChange("estado", e.target.value)}>
					<option value='pendiente'>Pendiente</option>
					<option value='completado'>Completado</option>
				</select>
			</div>
			<div className="flex flex-col gap-2">

				<select
					className="w-full h-10 border border-secondary1 bg-background2 p-2 rounded font-montserrat text-primary3 text-sm"
					value={formData.prioridad || ""}
					onChange={(e) => handleInputChange("prioridad", e.target.value)}>
					<option value='alta'>Alta</option>
					<option value='media'>Media</option>
					<option value='baja'>Baja</option>
				</select>
			</div>
		</div>
	);
};

export default DetailsForm;
