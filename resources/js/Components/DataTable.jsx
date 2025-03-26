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
import { object } from "zod";
import FilterButton from "@/Components/Filter";

/**
 * @typedef {Object} ButtonOptions
 * @property {string} id - The id used for the key of the button
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

    Array.isArray(buttonsOptions)
        ? null
        : (buttonsOptions = [
              { ...buttonsOptions, id: buttonsOptions?.id || "default" },
          ]);

    const getColumns = (id) => {
        return columns.find(column => column.id === id);
    }

    const filterMultiColumn = (row, column, value) => {
        if (getColumns(column).type === 'multi') {
            if (Array.isArray(row[column])) {
                for (const item of row[column]) {
                    if (item.key == value) {
                        return true;
                    }
                }
                return false;
            }
            if (row[column].key == value) {
                return true;
            }
            return false;
        }
        return row[column] == value;
    };

    const filterOnApply = (filters) => {
        setData(inputData);
        filters.forEach(element => {
            if (element.column && element.operator && element.value !== undefined) {
                setData((prevData) =>
                    prevData.filter((row) => {
                        switch (element.operator) {
                            case '=':
                                return filterMultiColumn(row, element.column, element.value);
                            case '!=':
                                return !filterMultiColumn(row, element.column, element.value);
                            case '>':
                                return row[element.column] > element.value;
                            case '<':
                                return row[element.column] < element.value;
                            case '>=':
                                return row[element.column] >= element.value;
                            case '<=':
                                return row[element.column] <= element.value;
                            default:
                                return true;
                        }
                    })
                );
            }
        });
    }

    const footer_buttons = buttonsOptions.map((buttonOptions) => {
        const selectedRowCount = Object.keys(rowSelection).length;
        const isVisible = selectedRowCount > 0 || buttonOptions.alwaysOn;

        return isVisible ? (
            <Button
                key={buttonOptions?.id}
                className="flex gap-2"
                variant={buttonOptions?.variant || "default"}
                onClick={() => buttonOptions.handler(rowSelection)}
            >
                {buttonOptions?.icon ? <Icon name={buttonOptions.icon} /> : null}
                {buttonOptions?.action ? buttonOptions.action + " " : null}
                {buttonOptions?.item
                    ? selectedRowCount +
                      (table.getSelectedRowModel().rows.length > 1
                          ? " " +
                            (buttonOptions.itemPlural
                                ? buttonOptions.itemPlural
                                : buttonOptions.item + "s")
                          : " " + buttonOptions.item)
                    : null}
            </Button>
        ) : null;
    });

    return (
        <>
            <div className="flex flex-col justify-between w-full h-full pb-24 overflow-auto">
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
            <div className="absolute flex justify-between w-full pr-4 bottom-4">
                <div className="flex justify-between w-full px-4 py-2 pr-6 bg-white">
                    <span className="flex items-center">
                        {table.getPreFilteredRowModel().rows.length}
                        {table.getPreFilteredRowModel().rows.length > 1
                            ? " résultats"
                            : " résultat"}
                    </span>
                    <div className="flex gap-2">
                        {footer_buttons}
                        <FilterButton columns={columns} onApply={filterOnApply} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataTable;
