import { createColumnHelper } from "@tanstack/react-table";

export class ColumnBuilder {
    constructor() {
        this.columnHelper = createColumnHelper();
        this.columns = [];
    }

    buildColumns(columnsHeaders) {
        columnsHeaders.forEach((columnHeader) => {
            this.columns.push(
                this.columnHelper.accessor(columnHeader, {
                    cell: (info) => info.getValue(),
                    footer: (info) => info.column.id,
                })
            );
        });
        return this.columns;
    }
}
