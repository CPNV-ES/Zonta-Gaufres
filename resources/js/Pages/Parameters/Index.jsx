"use client";
import React, { useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { z } from "zod";
import { Input } from "@/Components/ui/input.jsx";
import { Button } from "@/Components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/Components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

const Index = () => {
    const formSchema = z.object({
        backupPath: z.string().min(1, {
            message: "Le chemin de sauvegarde est requis",
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            backupPath: "", // Default value for the input
        },
    });

    const onSubmit = (data) => {
        axios
            .post("/parameters", data)
            .then((response) => {
                console.log("e");
                console.log(response.data);
                window.location.href = "/parameters";
            })
            .catch((error) => {
                console.log(data);
                console.error(error);
            });
    };

    return (
        <MainLayout color="purple" subject="Paramètres">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 p-8"
                >
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl">Paramètres</h1>
                            <h2 className="text-xl">Backup</h2>
                            <FormField
                                control={form.control}
                                name="backupPath"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chemin de sauvegarde complet*</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Chemin de sauvegarde (absolu)"
                                                {...field} // Bind the input to react-hook-form
                                            />
                                        </FormControl>
                                        Sauvegarder les données sur le chemin spécifié en ou de les restaurer à partir du chemin spécifié.
                                        Soyez sur que le fichier est nommé "backup.json" dans le cas d'une restauration.
                                        <FormMessage />
                                        <FormDescription>
                                        Ex : C:\Users\John\Desktop\pdf
                                    </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="destructive"
                            type="button"
                            onClick={() =>
                                (window.location.href = "/orders")
                            }
                        >
                            Annuler
                        </Button>
                        <Button className="bg-green-500" type="submit">
                            Sauvegarder les données
                        </Button>
                        <Button
                            className="bg-blue-500"
                            type="button"
                            onClick={() =>
                                (window.location.href = "/parameters/restore")
                            }
                        >
                            Restaurer les données
                        </Button>
                    </div>
                </form>
            </Form>
        </MainLayout>
    );
};

export default Index;