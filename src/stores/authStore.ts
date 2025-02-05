// stores/authStore.ts
import { create } from "zustand";

interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	role: string;
	status: string;
	username: string;
}

interface AuthState {
	isLoggedIn: boolean;
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: false,
	user: null,

	login: (user) => set({ isLoggedIn: true, user }),
	logout: () => set({ isLoggedIn: false, user: null }),
}));

export default useAuthStore;
