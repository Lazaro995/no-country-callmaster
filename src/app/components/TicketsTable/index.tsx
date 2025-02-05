import { TicketsTableProps } from "./TicketsTableProps";

export default function TicketsTable({ tickets }: TicketsTableProps) {
  return (
    <table className="w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-4 text-left">ID</th>
          <th className="p-4 text-left">Descripción</th>
          <th className="p-4 text-left">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id} className="border-t">
            <td className="p-4">{ticket.id}</td>
            <td className="p-4">{ticket.description}</td>
            <td className="p-4">{ticket.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
