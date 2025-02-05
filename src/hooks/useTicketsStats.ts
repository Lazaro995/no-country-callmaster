type RecentTickets = {
  [key: string]: { id: number; description: string; date: string }[];
};

export default function useTicketsStats() {
  const stats = [
    { label: "USTED", value: 5 },
    { label: "GRUPOS", value: 10 },
  ];

  const recentTickets: RecentTickets = {
    USTED: [
      { id: 1, description: "Ticket 1", date: "2025-01-21" },
      { id: 2, description: "Ticket 2", date: "2025-01-21" },
    ],
    GRUPOS: [
      { id: 3, description: "Ticket 3", date: "2025-01-21" },
      { id: 4, description: "Ticket 4", date: "2025-01-21" },
    ],
  };
console.log({stats, recentTickets}); // verificar
  return { stats, recentTickets };
}
