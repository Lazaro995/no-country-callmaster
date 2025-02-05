// stores/authStore.ts
import { create } from "zustand";
import { Incidence, PostIncidenceProps } from "@/props/IncidenceProps";




interface IncidencesState {
	incidences: Incidence[];
	deleteIncidences: (id: number) => void;
	getIncidences: () => Promise<void>;
	getIncidencesById: (id: number) => Promise<void>;
	postIncidences: (incidence:Incidence) => Promise<void>;
}

const endpoint: string = process.env.NEXT_PUBLIC_RENDER_ENDPOINT || "";

const useIncidenceStore = create<IncidencesState>((set) => ({
   
    incidences: [],
    deleteIncidences: (id) => set((state) => ({ incidences: state.incidences?.filter((incidence) => incidence.id !== id) })),
    getIncidences: async () => {
        const response = await fetch(`${endpoint}/incidencia`);
        const data = await response.json();
        set({ incidences: data });
    },
    getIncidencesById: async (id) => {
        const response = await fetch(`${endpoint}/incidencia/${id}`);
        const data = await response.json();
        set({ incidences: data });
    },
    postIncidences: async (incidence: PostIncidenceProps) => {
        const response = await fetch(`${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(incidence),
        });
        const data = await response.json();
        set({ incidences: data });
    }
    
}));

export default useIncidenceStore;
