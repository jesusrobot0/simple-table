"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handlePrevious = () => {
    table.previousPage();
  };
  const handleNext = () => {
    table.nextPage();
  };

  return (
    <div className="mb-32 flex flex-col">
      <table className="w-[1000px]">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-[#8c8c8d] bg-[#f3f4f6]">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 text-left font-normal">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full p-6 flex items-center justify-end gap-4">
        <button
          className="py-2 px-4 flex items-center gap-3 ounded-lg bg-gray-100"
          onClick={handlePrevious}
        >
          <ChevronLeft />
        </button>
        <p>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
        <button
          className="py-2 px-4 flex items-center gap-3 rounded-lg bg-gray-100"
          onClick={handleNext}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
