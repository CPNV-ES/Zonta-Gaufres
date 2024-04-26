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

import Icon from "@/Components/Icon";

const DataTable = ({ inputData, columns, buttonOptions, onClickHandler }) => {
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
        <>
            <div className="flex flex-col justify-between w-full h-full pb-12 overflow-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="sticky top-0 bg-white shadow-lg"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        style={{
                                            width: header.column.size,
                                        }}
                                        className="text-nowrap"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                onClick={onClickHandler ? () => onClickHandler(row) : null}
                                className={onClickHandler ? "cursor-pointer" : ""}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="text-nowrap"
                                    >
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
            <div className="absolute bottom-0 flex justify-between w-full p-2 bg-white">
                <span className="flex items-center">
                    {table.getPreFilteredRowModel().rows.length}
                    {table.getPreFilteredRowModel().rows.length > 1
                        ? " résultats"
                        : " résultat"}
                </span>
                {buttonOptions ? (
                    <Button
                        className="flex gap-2"
                        variant={buttonOptions?.variant || "default"}
                    >
                        {buttonOptions?.icon ? (
                            <Icon name={buttonOptions.icon} />
                        ) : null}
                        {buttonOptions?.action
                            ? buttonOptions.action + " "
                            : null}
                        {buttonOptions?.item
                            ? Object.keys(rowSelection).length +
                                  table.getSelectedRowModel().rows.length >
                              1
                                ? " " + buttonOptions.item + "s"
                                : " " + buttonOptions.item
                            : null}
                    </Button>
                ) : null}
            </div>
        </>
    );
};

export default DataTable;
