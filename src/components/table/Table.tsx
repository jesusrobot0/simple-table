"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import users from "@/data/MOCK_DATA.json";
import dayjs from "dayjs";
import { User } from "@/interfaces";

const data: User[] = users;
const columns: ColumnDef<User>[] = [
  {
    header: "Id", // Esto es lo que queremos mostrar en pantalla
    accessorKey: "id", // Y esto otro es el key del objeto con el cual va a construir la columna
    footer: "My footer", // Este es el footer de la columna
  },
  // {
  //   header: "Name",
  //   accessorKey: "name",
  //   footer: "My Name",
  // },
  // {
  //   header: "Last Name",
  //   accessorKey: "lastname",
  //   footer: "My Last Name",
  // },
  // Podemos crear nuestras propias filas
  {
    header: "Nombre Completo",
    accessorFn: (row) => `${row.name} ${row.lastname}`,
  },
  {
    header: "Email",
    accessorKey: "email",
    footer: "My Email",
  },
  {
    header: "Country",
    accessorKey: "country",
    footer: "My Country",
  },
  {
    header: "Birth",
    accessorKey: "dateOfBirth",
    cell: (info) => dayjs(info.row.getValue(info.column.id)).format("DD/MM/YY"), // Asi es como procesamos el dato de una celda antes de mostrarlo en pantalla
    footer: "My Birth",
  },
];

export function DataTable() {
  const [sorting, setSorting] = useState<any>([]);

  // Configuración de la tabla
  const table = useReactTable({
    data, // Data que va a representar la tabla (FILAS)
    columns, // Nombre de las columnas (HEADINGS)
    getCoreRowModel: getCoreRowModel(), // Caracteristicas basicas para mostrar la tabla
    getPaginationRowModel: getPaginationRowModel(), // Habilitar la paginación
    getSortedRowModel: getSortedRowModel(), // Habilitar la ordenación de los datos de la tabla
    state: { sorting },
    onSortingChange: setSorting,
  });

  // Meéodos de la paginación
  const handleFirstPage = () => {
    table.setPageIndex(1);
  };

  const handlePrevious = () => {
    table.previousPage();
  };

  const handleNext = () => {
    table.nextPage();
  };

  const handleLastPage = () => {
    table.setPageIndex(table.getPageCount() - 1);
  };

  return (
    <div className="mb-44 flex flex-col">
      <table className="w-[1000px]">
        <thead>
          {/* CONSTRUIMOS EL HEADER DE LA TABLA */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-[#8c8c8d] bg-[#f3f4f6]">
              {/* Construimos los HEADINGS  */}
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 text-left font-normal"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex gap-2">
                    {flexRender(
                      // Por defecto lo de abajo 👇 devuelve un obj, es necesario esta funcion para renderizarlo como html
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <ChevronUp />,
                      desc: <ChevronDown />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* CONSTRUIMOS LA FILA */}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {/* LLENAMOS LAS CELDAS DE LA FILA */}
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} className="text-[#8c8c8d]">
              {footerGroup.headers.map((footer) => (
                <th key={footer.id} className="p-4 text-left font-normal">
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="w-full p-6 flex items-center justify-end gap-4">
        <button
          className="py-2 px-4 flex items-center gap-3 ounded-lg bg-gray-100"
          onClick={handleFirstPage}
        >
          <ChevronFirst />
        </button>
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
        <button
          className="py-2 px-4 flex items-center gap-3 ounded-lg bg-gray-100"
          onClick={handleLastPage}
        >
          <ChevronLast />
        </button>
      </div>
    </div>
  );
}
