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
                this.columnHelper.accessor(colDef.accessor, {
                    id: colDef.accessor,
                    header:
                        colDef.header.toUpperCase() ??
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
