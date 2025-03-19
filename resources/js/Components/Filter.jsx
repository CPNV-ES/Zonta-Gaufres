import React, { useState } from 'react';

import { Button } from "@/Components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { capitalizeFirstLetter } from "@/lib/utils";

const FilterButton = ({ children = "Filtrer", columns, onApply }) => {
    const [filters, setFilters] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addFilter = () => {
        setFilters([...filters, {"column": columns[0].id, "operator": "=", "value": ""}]);
    }

    const removeFilter = (index) => {
        const newFilters = filters.filter((_, i) => i !== index);
        setFilters(newFilters);
    }

    const handleChange = (columns, index, value) => {
        const newFilters = filters.map((filter, i) => {
            if (i === index) {
                if (columns === "column") {
                    if (getColumns(value).type === "multi" && getColumns(value).multi.length > 0) {
                        return {
                            ...filter,
                            value: getColumns(value).multi[0].key,
                            [columns]: value,
                        };
                    }
                    return {
                        ...filter,
                        value: "",
                        [columns]: value,
                    };
                }
                return {
                    ...filter,
                    [columns]: value,
                };
            }

            return filter;
        });

        setFilters(newFilters);
    }

    const getColumns = (id) => {
        return columns.find(column => column.id === id);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default">{ children }</Button>
            </DialogTrigger>
            <DialogContent>
                <div className="flex justify-between items-center mt-3">
                    <DialogTitle>Filtrer par</DialogTitle>
                    <Button variant="green" onClick={() => addFilter()}>Ajouter</Button>
                </div>
                {filters.map((filter, index) => (
                    <div key={index} className="flex items-center justify-between mt-3 border p-1 rounded-md">
                        <div>
                            <select
                                value={filter.column}
                                className='w-32'
                                onChange={(e) => handleChange("column", index, e.target.value)}
                            >
                                {columns.map((column, i) => (
                                    (column.id != 'actions' && typeof column.header === 'string' &&
                                    <option key={i} value={column.id}>
                                        {capitalizeFirstLetter(column.header.toLowerCase())}
                                    </option> )
                                ))}
                            </select>
                            <select
                                value={filter.operator}
                                className='w-32'
                                onChange={(e) => handleChange("operator", index, e.target.value)}
                            >
                                <option value="=">Equals</option>
                                { getColumns(filter.column).type === "number" && <option value=">">Greater Than</option> }
                                { getColumns(filter.column).type === "number" && <option value=">=">Greater Than or Equals</option> }
                                { getColumns(filter.column).type === "number" && <option value="<">Less Than</option> }
                                { getColumns(filter.column).type === "number" && <option value="<=">Less Than or Equals</option> }
                                <option value="!=">Not Equals</option>
                            </select>
                            { getColumns(filter.column).type === "multi" ? (
                                <select
                                    className='w-full'
                                    value={filter.value}
                                    onChange={(e) => handleChange("value", index, e.target.value)}
                                >
                                    {getColumns(filter.column).multi.map((option, i) => (
                                        <option key={i} value={option.key}>{option.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <Input value={filter.value} onChange={(e) => handleChange("value", index, e.target.value)} />
                            )}
                        </div>
                        <Button variant="red" onClick={() => removeFilter(index)}>Supprimer</Button>
                    </div>
                ))}
                <DialogFooter>
                    <Button variant="blue" onClick={() => { setIsOpen(false); onApply(filters); }}>Appliquer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FilterButton;