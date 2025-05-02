import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import { z } from "zod";
import { Input } from "@/Components/ui/input.jsx";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { format } from "date-fns";
import { Textarea } from "@/Components/ui/textarea";
import { PHONENUMBER_REGEX } from "@/lib/regex";


const onSubmit = (data) => {
    axios
        .post("/parameters", data)
        .then((response) => {
            console.log(response.data);
            window.location.href = "/parameters";
        })
        .catch((error) => {
            console.error("There was an error!", error);
        });
}

const Index = () => {
    const form = useForm({
        resolver: zodResolver(
            z.object({
                backupPath: z.string().min(1, {
                    message: "Le chemin de sauvegarde est requis",
                }),
            })
        )
    })
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
                                        <FormLabel>Chemin de sauvegarde</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Chemin de sauvegarde"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
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
                        <Button className="bg-blue-500"                                 variant="destructive"
                            type="button"
                            onClick={() =>
                                (window.location.href = "/parameters/restore")
                            }>
                            Restaurer les données
                        </Button>
                    </div>
                </form>
            </Form>
        </MainLayout>
    );
};
export default Index;
