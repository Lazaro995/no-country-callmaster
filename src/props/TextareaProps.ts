import React from "react";

export type TextareaProps = {
    nombre: string;
    error?: string;
    cambio: Function;
    value: string;
    item?: React.ReactNode;
}
