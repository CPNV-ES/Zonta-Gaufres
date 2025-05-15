import React, { useEffect } from "react";
import { Button } from "@/Components/ui/button";
import {
    Dialog as D,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

const Dialog = ({
    children,
    title,
    description,
    buttonLabel,
    buttonVariant = "default",
    triggerLabel,
    action,
    onClose,
    setIsOpen,
    isOpen = false,
}) => {
    useEffect(() => {
        if (!isOpen) onClose;
    }, [isOpen]);

    return (
        <D open={isOpen} onOpenChange={setIsOpen}>
            {triggerLabel ? (
                <DialogTrigger asChild>
                    <Button variant="outline">{triggerLabel}</Button>
                </DialogTrigger>
            ) : null}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button
                        onClick={() => {
                            action() && setIsOpen(false);
                        }}
                        type="submit"
                        variant={buttonVariant}
                    >
                        {buttonLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </D>
    );
};

export default Dialog;
