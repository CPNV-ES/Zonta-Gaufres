import { createColumnHelper } from "@tanstack/react-table";

export class ColumnBuilder {
    constructor() {
        this.columnHelper = createColumnHelper();
        this.columns = [];
    }

    buildColumns(columnsDefinitions) {
        this.checkRequiredValues(columnsDefinitions);
        columnsDefinitions.forEach((colDef) => {
            this.columns.push(
                this.columnHelper.accessor(colDef.name, {
                    id: colDef.id ?? null,
                    cell: colDef.cell ?? ((info) => info.renderValue()),
                    footer: colDef.footer ?? ((info) => info.column.id),
                    size: colDef.size ?? null
                })
            );
        });
        return this.columns;
    }

    checkRequiredValues(columnsDefinitions) {
        columnsDefinitions.forEach((colDef) => {
            if (!colDef.name) {
                throw new Error("Column name is required");
            }
        });
    }
}
