import { useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { Button } from "@/Components/ui/button";

import Icon from "@/Components/Icon"

const DataTable = ({ inputData, columns, buttonOptions }) => {
    const [data, setData] = useState([...inputData]);

    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
            minSize: 50,
        },
        state: {
            rowSelection,
        },
        onRowSelectionChange: setRowSelection,
    });

    return (
        <div className="flex flex-col justify-between w-full h-full p-2">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    style={{
                                        width: header.column.size,
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
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
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
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
            <div className="flex justify-between p-2">
                <span className="flex items-center">
                    {table.getPreFilteredRowModel().rows.length}
                    {table.getPreFilteredRowModel().rows.length > 1
                        ? " résultats"
                        : " résultat"}
                </span>
                <Button className="flex gap-2" variant={buttonOptions.variant}>
                    <Icon name={buttonOptions.icon} />
                    {buttonOptions.action} {Object.keys(rowSelection).length}
                    {console.log(table.getSelectedRowModel().rows.length > 1)}
                    {table.getSelectedRowModel().rows.length > 1
                        ? " " + buttonOptions.item + "s"
                        : " " + buttonOptions.item}
                </Button>
            </div>
        </div>
    );
};

export default DataTable;
