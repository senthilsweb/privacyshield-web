"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { Table } from "@tanstack/react-table";

interface ColumnSelectorProps {
  table: Table<any>;
  icon?: React.ReactNode;
  buttonText?: string;
}



export const ColumnSelector = ({ 
  table, 
  icon = <Icons.sliders className="w-4 h-4 mr-2" />,
  buttonText = "Columns"
}: ColumnSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  // Initialize with current visibility
  const [tempVisibility, setTempVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(
      table.getAllColumns()
        .filter(column => column.getCanHide())
        .map(column => [column.id, !column.getIsVisible()])
    )
  );

  const handleHeaderCheckboxChange = (checked: boolean) => {
    const newVisibility = {};
    table.getAllColumns().forEach(column => {
      if (column.getCanHide()) {
        // When checkbox is checked, hide column (set visibility to true)
        newVisibility[column.id] = !checked;
      }
    });
    setTempVisibility(newVisibility);
  };

  const handleSubmit = useCallback(() => {
    // Convert our checkbox state to column visibility state
    const newVisibility = {};
    Object.entries(tempVisibility).forEach(([columnId, isHidden]) => {
      newVisibility[columnId] = isHidden;
    });
    table.setColumnVisibility(newVisibility);
    setOpen(false);
  }, [table, tempVisibility]);

  const filteredColumns = table
    .getAllColumns()
    .filter(column => column.getCanHide())
    .filter(column => 
      column.id.toLowerCase().includes(search.toLowerCase())
    );

  // Check if all visible columns are checked
  const areAllChecked = filteredColumns.every(
    column => !tempVisibility[column.id]
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          {icon}
          {buttonText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[240px]" 
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-2 space-y-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
          
          <div className="border rounded-md">
            <div className="border-b">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[30px] p-2">
                      <Checkbox
                        checked={areAllChecked}
                        onCheckedChange={handleHeaderCheckboxChange}
                        aria-label="Select all columns"
                      />
                    </th>
                    <th className="text-left text-sm py-2 pr-2">Field</th>
                  </tr>
                </thead>
              </table>
            </div>
            
            <div className="max-h-[300px] overflow-auto">
              <table className="w-full">
                <tbody className="divide-y">
                  {filteredColumns.map(column => (
                    <tr key={column.id}>
                      <td className="w-[30px] p-2">
                        <Checkbox
                          checked={!tempVisibility[column.id]}
                          onCheckedChange={(checked) => {
                            setTempVisibility(prev => ({
                              ...prev,
                              [column.id]: !checked
                            }));
                          }}
                          aria-label={`Show ${column.id} column`}
                        />
                      </td>
                      <td className="text-sm py-2 pr-2">
                        {column.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleSubmit}
          >
            Apply Changes
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
