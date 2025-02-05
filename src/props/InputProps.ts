import React from "react";

export type InputProps = {
    nombre: string;
    error?: string;
    cambio: Function;
    value: string;
    item?: React.ReactNode;
    inputType:string | 'text' 
}
