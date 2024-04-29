import { createColumnHelper } from "@tanstack/react-table";

export class ColumnBuilder {
    constructor() {
        this.columnHelper = createColumnHelper();
        this.columns = [];
    }

    /**
     * @typedef {Object} ColumnDefinition
     * @property {string} accessor - The accessor of the column which will be used to get the data from the inputData object
     * @property {string} header - The header of the column which will be displayed in the table
     * @property {function} cell - The cell of the column which will be used to render the value of the column
     * @property {function} footer - The footer of the column which will be displayed in the table
     * @property {number} size - The size of the column which will be used to define the width of the column
     */

    /**
     * Build columns for the DataTable component
     * @param {[ColumnDefinition]} columnsDefinitions - Array of objects containing the column definitions
     * @returns 
     */
    buildColumns(columnsDefinitions) {
        this.checkRequiredValues(columnsDefinitions);
        columnsDefinitions.forEach((colDef) => {
            this.columns.push(
                this.columnHelper.accessor(colDef.accessor, {
                    id: colDef.accessor,
                    header:
                        typeof colDef.header == "function"
                            ? (colDef.header)
                            : colDef.header?.toUpperCase() ??
                              colDef.accessor.toUpperCase(),
                    cell: colDef.cell ?? ((info) => info.renderValue()),
                    footer: colDef.footer ?? ((info) => info.column.id),
                    size: colDef.size ?? null,
                })
            );
        });
        return this.columns;
    }

    checkRequiredValues(columnsDefinitions) {
        columnsDefinitions.forEach((colDef) => {
            if (!colDef.accessor) {
                throw new Error("Column accessor is required");
            }
        });
    }
}
