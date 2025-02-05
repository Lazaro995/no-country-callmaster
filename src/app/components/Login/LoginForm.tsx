"use client";

import React, { useState } from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import ItemButton from "@/app/components/Login/ItemButton";
import LinkComponent from "@/app/components/LinkComponent";
import HidePassword from "@/app/components/Login/HidePassword";
import ShowPassword from "@/app/components/Login/ShowPassword";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import { userData as data } from "@/utils/Data/userData";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState<string | null>(null);
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const { login } = useAuthStore();
	// Validación del correo electrónico
	const loginEndpoint = process.env.loginEndpoint;
	const validateEmail = (value: string) => {
		if (!value) {
			setEmailError("El campo no puede estar vacío.");
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			setEmailError("El correo electrónico no es válido.");
		} else {
			setEmailError(null);
		}
		setEmail(value);
	};

	// Validación de la contraseña
	const validatePassword = (value: string) => {
		if (!value) {
			setPasswordError("El campo no puede estar vacío.");
		} else if (value.length < 8) {
			setPasswordError("La contraseña debe tener al menos 8 caracteres.");
		} else {
			setPasswordError(null);
		}
		setPassword(value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			// Realizar la solicitud al endpoint de login
			if (!loginEndpoint) {
				const user = data.find(
					(user) => user.email === email && user.password === password
				);
				if (user) {
					login( user);
					router.push("/");
				} else {
					alert("Credenciales incorrectas");
				}
			} else {
				const response = await fetch(loginEndpoint ?? "", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				});

				const data = await response.json();

				if (response.ok) {
					// Autenticación exitosa
					login(data); // Actualizar el estado global
					router.push("/"); // Redirigir a la página principal
				} else {
					// Credenciales incorrectas
					alert(data.message || "Credenciales incorrectas");
				}
			}
		} catch (error) {
			console.error("Error al autenticar:", error);
			alert("Error en el servidor. Por favor, inténtalo de nuevo.");
		}
		setEmail("");
		setPassword("");
	};
	const showPasswordHandler = () => {
		setShowPassword(!showPassword);
	};
	return (
		<form onSubmit={handleSubmit}>
			<Input
				nombre='tucorreo@gmail.com'
				value={email}
				error={emailError ?? ""}
				cambio={validateEmail}
				inputType='email'
			/>

			<Input
				nombre='Contraseña'
				value={password}
				error={passwordError ?? ""}
				cambio={validatePassword}
				inputType={showPassword ? "text" : "password"}
				item={
					<ItemButton
						type='button'
						disableOptions={false}
						handler={showPasswordHandler}
						buttonName={showPassword ? <HidePassword /> : <ShowPassword />}
					/>
				}
			/>
			<div className='font-montserrat font-normal text-[14px] leading-[17px] italic'>
				<LinkComponent
					cssClass='underline'
					nombre='Olvidé mi contraseña'
					redireccion='/regis'
					target='_blank'></LinkComponent>
			</div>
			<div className='flex justify-center'>
				<Button
					type='submit'
					disableOptions={!!emailError || !!passwordError}
					buttonName='Iniciar sesión'
				/>
			</div>
		</form>
	);
};

export default LoginForm;
