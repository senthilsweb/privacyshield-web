"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  VisibilityState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Icons } from "@/components/icons";
import { ColumnSelector } from "@/components/column-selector";
import EmptyState from "./empty-state";

interface SQLEditorProps {
  className?: string;
}

const ITEMS_PER_PAGE = 25;

const formatCellValue = (value: any): React.ReactNode => {
  if (value === null)
    return <span className="text-muted-foreground">null</span>;
  if (typeof value === "boolean") {
    return value ? (
      <Icons.check className="w-4 h-4 text-green-500" />
    ) : (
      <Icons.x className="w-4 h-4 text-red-500" />
    );
  }
  if (typeof value === "object") {
    if (value instanceof Date) {
      return value.toLocaleString();
    }
    return JSON.stringify(value);
  }
  return String(value);
};

export const SQLEditor = ({ className }: SQLEditorProps) => {
  const [query, setQuery] = useState(`SELECT * FROM tickit.user LIMIT 100;`);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const executeQuery = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://duckdb-data-api.vercel.app/execute/sql",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to execute query");
      }

      const result = await response.json();

      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const dynamicColumns: ColumnDef<any, any>[] = Object.keys(
          result.data[0]
        ).map((key) => ({
          id: key,
          accessorKey: key,
          header: () => <div className="text-left font-semibold">{key}</div>,
          cell: ({ getValue }) => (
            <div className="text-left whitespace-nowrap">
              {formatCellValue(getValue())}
            </div>
          ),
        }));

        setColumns(dynamicColumns);
        setData(result.data);
        // Reset column visibility when new query is executed
        setColumnVisibility({});
      } else {
        setData([]);
        setColumns([]);
        setColumnVisibility({});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: ITEMS_PER_PAGE,
      },
    },
  });

  return (
    <div className="flex flex-col space-y-4">
      <Card className="overflow-hidden">
        <div className="border-b p-2 flex items-center justify-between bg-muted/50">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={executeQuery}
              disabled={isLoading}
            >
              <Icons.play className="w-4 h-4 mr-2" />
              Run
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setData([]);
                setColumns([]);
                setError("");
              }}
            >
              <Icons.rotateCounterClockwise className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuery(`SELECT * FROM tickit.user LIMIT 100;`)}
            >
              <Icons.wand2 className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 font-mono text-sm h-[200px] focus:outline-none bg-background resize-none"
            placeholder="Enter your DuckDB SQL query here..."
            spellCheck={false}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </Card>

      {error && (
        <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {data.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div>
              <div className="flex items-center justify-between border-b p-4">
                <div>
                  <h3 className="font-semibold">Query Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Showing rows{" "}
                    {table.getState().pagination.pageIndex * ITEMS_PER_PAGE + 1}{" "}
                    -{" "}
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        ITEMS_PER_PAGE,
                      data.length
                    )}{" "}
                    of {data.length}
                  </p>
                </div>
                <ColumnSelector table={table} />
              </div>
              <div className="relative rounded-md border">
                <div className="overflow-auto" style={{ maxHeight: "500px" }}>
                  <Table>
                    <TableHeader className="sticky top-0 bg-background z-10">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className="whitespace-nowrap"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="h-12">
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="px-4 py-2">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex items-center justify-between px-4 py-2 border-t">
                <div className="flex-1 text-sm text-muted-foreground">
                  {data.length} total rows
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                    >
                      <Icons.chevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous page</span>
                    </Button>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                    >
                      <Icons.chevronRight className="h-4 w-4" />
                      <span className="sr-only">Next page</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        !isLoading && <EmptyState />
      )}
    </div>
  );
};

export default SQLEditor;
