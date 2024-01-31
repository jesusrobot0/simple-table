"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import data from "@/data/MOCK_DATA.json";
import dayjs from "dayjs";
import { User } from "@/interfaces";

const users: User[] = data;

const columns: ColumnDef<User>[] = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Last Name",
    accessorKey: "lastname",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Country",
    accessorKey: "country",
  },
  {
    header: "Birth",
    accessorKey: "dateOfBirth",
    cell: (info) => dayjs(info.row.getValue(info.column.id)).format("DD/MM/YY"),
  },
];

export function DataTable() {
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="border border-gray-300 ">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="border-b boder-gray-300 bg-blue-100"
          >
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-4">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="[&>*:nth-child(even)]:bg-gray-100">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b boder-gray-300">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
