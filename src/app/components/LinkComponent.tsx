import React from "react";
import Link from "next/link";
import { LinkProps } from "@/props/linkProps";

const LinkComponent = ({ nombre, redireccion, target, cssClass }: LinkProps) => {
	return <Link className={cssClass} href={redireccion} target={target}>{nombre}</Link>;
};

export default LinkComponent;
