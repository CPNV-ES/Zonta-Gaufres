import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
This badge component is cloned from the original component of shadcn/ui
https://ui.shadcn.com/docs/components/badge
*/

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                DELIVERY: "border-transparent bg-slate-200 text-blue-500",
                INVOICE: "border-transparent bg-gray-200 text-slate-500",
                UPSTREAM: "border-transparent bg-green-200 text-green-500",
                PAID: "border-transparent bg-green-200 text-green-500",
                PENDING: "border-transparent bg-yellow-200 text-yellow-500",
                CANCELLED: "border-transparent bg-red-200 text-red-500",
                OPEN: "border-transparent bg-blue-200 text-blue-500",
                // people roles badges colors
                DELIVERY_GUY: "border-transparent bg-blue-200 text-blue-500",
                ADMIN: "border-transparent bg-green-200 text-green-500",
                STAFF: "border-transparent bg-yellow-200 text-yellow-500",
                CLIENT: "border-transparent bg-red-200 text-red-500",
                INPROGRESS: "border-transparent bg-yellow-200 text-yellow-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
