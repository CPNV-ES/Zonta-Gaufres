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

/**
 * @typedef {Object} ButtonOptions
 * @property {string} variant - The variant of the button
 * @property {string} icon - The Lucide icon name of the button icon
 * @property {string} action - The action label of the button
 * @property {string} item - The item label of the button
 * @property {string} itemPlural - The plural item label of the button
 * @property {function} handler - The handler of the button click event
 */

/**
 * @typedef {Array} ButtonsOptions
 */

/**
 * The DataTable component is a reusable component that renders a table with the given data.
 * You have to use the ColumnBuilder() to build the columns and pass them as props to the DataTable component.
 * You have to know that the columns will pull the data from the inputData object and will search for the acessor object passed in the columns.
 *
 * @param {array} inputData - Array of object to be displayed in the table
 * @param {array} columns - Array of object built by the ColumnBuilder class to define the columns of the table
 * @param {ButtonsOptions} buttonsOptions - The array of ButtonOptions for the buttons displayed at the bottom of the table
 * @param {function} onClickHandler - The function to be called when a row is clicked
 * @returns
 */
const DataTable = ({ inputData, columns, buttonsOptions, onClickHandler }) => {
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

    const footer_buttons = buttonsOptions.map((buttonOptions) => (
        <Button
            key={buttonOptions?.id}
            className="flex gap-2"
            variant={buttonOptions?.variant || "default"}
            onClick={() => buttonOptions.handler(rowSelection)}
        >
            {buttonOptions?.icon ? <Icon name={buttonOptions.icon} /> : null}
            {buttonOptions?.action ? buttonOptions.action + " " : null}
            {buttonOptions?.item
                ? Object.keys(rowSelection).length +
                  (table.getSelectedRowModel().rows.length > 1
                      ? " " +
                        (buttonOptions.itemPlural
                            ? buttonOptions.itemPlural
                            : buttonOptions.item + "s")
                      : " " + buttonOptions.item)
                : null}
        </Button>
    ));

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
                                onClick={
                                    onClickHandler
                                        ? () => onClickHandler(row)
                                        : null
                                }
                                className={
                                    onClickHandler ? "cursor-pointer" : ""
                                }
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
                <div className="flex gap-2">{footer_buttons}</div>
            </div>
        </>
    );
};

export default DataTable;
