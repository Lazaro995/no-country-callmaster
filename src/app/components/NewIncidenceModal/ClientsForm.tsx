import React from 'react'
import Input from "../Input";
import { PostIncidenceProps } from '@/props/IncidenceProps';

const ClientsForm = ({ formData, handleInputChange }: { formData: PostIncidenceProps, handleInputChange: (field: string, value: string) => void; }) => (
	<div className="grid grid-cols-2 gap-4 p-4 bg-background1 border border-secondary1 rounded-md shadow-md">
		<Input
			nombre='Nombre'
			inputType='text'
			cambio={handleInputChange}
			value={formData.nombre || ""}
		/>
		<Input
			nombre='Apellido'
			inputType='text'
			cambio={handleInputChange}
			value={formData.apellido || ""}
		/>
		<Input
			nombre='DNI'
			inputType='number'
			cambio={handleInputChange}
			value={formData.dni || ""}
		/>
		<Input
			nombre='Correo'
			inputType='email'
			cambio={handleInputChange}
			value={formData.correo || ""}
		/>
		<Input
			nombre='Telefono'
			inputType='tel'
			cambio={handleInputChange}
			value={formData.telefono || ""}
		/>
		<div className="flex flex-col gap-2">
			<select
				className="w-full h-10 border border-secondary1 bg-background2 p-2 rounded font-montserrat text-primary3 text-sm"
				value={formData.estado || ""}
				onChange={(e) => handleInputChange("estado", e.target.value)}>
				<option value='activo'>Activo</option>
				<option value='inactivo'>Inactivo</option>
			</select>
		</div>
	</div>
);

export default ClientsForm
