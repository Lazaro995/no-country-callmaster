import { MouseEventHandler } from "react";
export type ButtonProps = {
	type: "submit" | "reset" | "button";
	disableOptions: boolean;
    handler?: MouseEventHandler<HTMLButtonElement>;
    buttonName: string|React.ReactNode
}
