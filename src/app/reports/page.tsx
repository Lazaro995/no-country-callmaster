import { users } from "@/utils/Data/data";
import Table from "../components/Table/Table";
import handlerViewClick from "@/utils/functions/handlerViewClick";



export default function Reports() {
  const columnas = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "AGE", uid: "age", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "TEAM", uid: "team" },
    { name: "EMAIL", uid: "email" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
  ]

    return (
			<div>
				<h1 className='text-2xl font-bold'>Reportes</h1>
				<p>Bienvenido a reportes.</p>
				<Table
					columns={columnas}
					data={users}
					initialVisibleColumns={[
						"id",
						"name",
						"age",
						"role",
						"team",
						"email",
						"status",
					]}
					statuses={[
						{ uid: "active", name: "Active" },
						{ uid: "paused", name: "Paused" },
						{ uid: "vacation", name: "Vacation" },
					]}
				viewClick={handlerViewClick}
			></Table>
			
			</div>
		);
  }
  