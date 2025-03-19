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
                    if (getColumns(value).type === "date") {
                        return {
                            ...filter,
                            value: new Date().toISOString().split('T')[0],
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
                                <option value="=">Égal</option>
                                { getColumns(filter.column).type === "number" && <option value=">">Supérieur à</option> }
                                { getColumns(filter.column).type === "date" && <option value="<=">Avant</option> }
                                { getColumns(filter.column).type === "date" && <option value=">=">Après</option> }
                                { getColumns(filter.column).type === "number" && <option value=">=">Supérieur ou égal à</option> }
                                { getColumns(filter.column).type === "number" && <option value="<">Inférieur à</option> }
                                { getColumns(filter.column).type === "number" && <option value="<=">Inférieur ou égal à</option> }
                                <option value="!=">Pas égal</option>
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
                            ) : getColumns(filter.column).type === "date" ? (
                                <Input type="date" value={filter.value} onChange={(e) => handleChange("value", index, e.target.value)} />
                            ) :  (
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