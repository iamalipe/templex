"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { TableColumnsCard } from "@/types/DataTable";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  columnsCard: TableColumnsCard<TData>[];
  data: TData[];
  total: number;
  currentPage: number;
  pageSize: number;
}

export function DataTable<TData, TValue>({
  columns,
  columnsCard,
  data,
  total,
  currentPage,
  pageSize,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: currentPage - 1, //custom initial page index
        pageSize: pageSize, //custom default page size
      },
    },
    manualPagination: true, //turn off client-side pagination
    enableRowSelection: true,
    // autoResetPageIndex: false, //turn off auto reset of pageInde
    rowCount: total, //pass in the total row count so the table knows how many pages there are (pageCount calculated internally if not provided)
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  // console.log(
  //   "table.getHeaderGroups()",
  //   table.getHeaderGroups(),
  //   table.getRowModel()
  // );

  return (
    <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
      <DataTableToolbar table={table} />
      {/* card view */}
      <div className="overflow-auto gap-4 flex-1 flex flex-col scrollbar-thin">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => {
            return (
              <div
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border flex flex-col p-4 rounded-md flex-none transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                {row.getVisibleCells().map((cell) => {
                  const findHeader = columnsCard.find(
                    (e) => e.accessorKey === cell.column.id
                  );

                  if (cell.id === `${index}_actions`) {
                    const findActions = columnsCard.find(
                      (e) => e.accessorKey === "ACTIONS"
                    );
                    return (
                      <React.Fragment key={cell.id}>
                        {findActions?.header}
                      </React.Fragment>
                    );
                  }
                  if (!findHeader) return <React.Fragment key={cell.id} />;
                  return (
                    <div
                      key={cell.id}
                      className="flex text-sm gap-2 justify-between"
                    >
                      <p>
                        <span className="italic text-muted-foreground">
                          {findHeader.header}
                        </span>{" "}
                        : {cell.getValue() as string}
                      </p>
                      {/* <p>
                    <span className="italic text-muted-foreground">
                      Nationality
                    </span>{" "}
                    : NPL
                  </p> */}
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <span>No results.</span>
        )}
      </div>

      {/* Main Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="border-b-0 table-header-box-shadow"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
}
