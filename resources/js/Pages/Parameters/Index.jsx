"use client";
import React from "react";
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
    FormDescription,
} from "@/Components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { usePage } from "@inertiajs/react"; // Import Inertia's usePage hook

const Index = () => {
    const { props } = usePage(); // Access Inertia props
    const { success, errors } = props; // Extract success and errors messages

    const formSchema = z.object({
        backupPath: z
            .string()
            .min(1, {
                message: "Le chemin de sauvegarde est requis",
            })
            .refine((path) => !path.endsWith("\\")   , {
                message: "Le chemin ne doit pas se terminer par un slash (\\)",
            })
            .refine((path) => !path.endsWith("/")   , {
                message: "Le chemin ne doit pas se terminer par un slash (/)",
            })
            .refine((path) => !/\.\w+$/.test(path), {
                message: "Le chemin ne doit pas contenir un fichier (pas d'extension de fichier)",
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
    const handleRestore = () => {
        const backupPath = form.getValues("backupPath");
        window.location.href = `/parameters/restore?path=${encodeURIComponent(
            backupPath
        )}`;
    };

    return (
        <MainLayout color="purple" subject="Paramètres">
            <div className="p-4">
                {/* Display success message */}
                {success && (
                    <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                        {success}
                    </div>
                )}
                {/* Display error messages */}
                {errors && (
                    <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                        {Object.values(errors).map((errorArray, index) => (
                            <p key={index}>{errorArray[0]}</p>
                        ))}
                    </div>
                )}
            </div>
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
                                        <FormDescription>
                                        Sauvegarder les données sur le chemin spécifié ou de les restaurer à partir du chemin spécifié.
                                        Soyez sur que le fichier est nommé "backup*date*.sqlite" dans le cas d'une restauration.
                                        Ne mettez pas de slash à la fin du chemin.
                                        Ex : C:\Users\John\Desktop\backupZonta
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
                        <Button className="bg-green-500" type="submit"  disabled={!form.formState.isValid} >
                            Sauvegarder les données
                        </Button>
                        <Button
                            className="bg-blue-500"
                            type="button"
                            onClick={handleRestore}
                            disabled={!form.formState.isValid} // Disable the button if the form is invalid
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
