export type Ticket = {
    id: number;
    description: string;
    date: string;
  };
  
  export type TicketsTableProps = {
    tickets: Ticket[];
  };
  