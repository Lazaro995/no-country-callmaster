import React from 'react'
import Input from '../Input';
import Textarea from '../Textarea';
import { PostIncidenceProps } from '@/props/IncidenceProps';

const ServicesForm = ({formData, handleInputChange}:{ formData: PostIncidenceProps, handleInputChange:(field: string, value: string) => void;}) => {
  return (
	<div className="p-4 bg-background1 border border-secondary1 rounded-md shadow-md">
			<Input
				nombre='Nombre'
				inputType='text'
				cambio={handleInputChange}
				value={formData.nombre || ""}
			/>
			<Textarea
				nombre='Descripcion'
				cambio={handleInputChange}
				value={formData.descripcion || ""}
			/>
		</div>
	);
}

export default ServicesForm
