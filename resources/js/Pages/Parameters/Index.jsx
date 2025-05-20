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
import { useForm } from "react-hook-form";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const Index = () => {
    const { props } = usePage();
    const [success, setSuccess] = useState(props.success || "");
    const [errors, setErrors] = useState({});

const backupPathSchema = z
.string()
.min(1, {
    message: "Le chemin de sauvegarde est requis",
})
.refine((path) => !path.endsWith("\\"), {
    message: "Le chemin ne doit pas se terminer par un slash (\\)",
})
.refine((path) => !path.endsWith("/"), {
    message: "Le chemin ne doit pas se terminer par un slash (/)",
})
.refine((path) => !/\.\w+$/.test(path), {
    message: "Le chemin ne doit pas contenir un fichier (pas d'extension de fichier)",
});

const restorePathSchema = z
.string()
.min(1, {
    message: "Le chemin de restauration est requis",
})
.refine((path) => path.endsWith(".sqlite"), {
    message: "Le fichier doit être un fichier SQLite valide (extension .sqlite)",
});

const form = useForm({
    defaultValues: {
        backupPath: "",
        restorePath: "",
    },
});

const validateBackupPath = (backupPath) => {
    try {
        backupPathSchema.parse(backupPath);
        return null;
    } catch (error) {
        return error.errors[0].message;
    }
};

const validateRestorePath = (restorePath) => {
    try {
        restorePathSchema.parse(restorePath);
        return null;
    } catch (error) {
        return error.errors[0].message;
    }
};

const onSubmitBackup = () => {
    const backupPath = form.getValues("backupPath");
    const error = validateBackupPath(backupPath);

    if (error) {
        alert(error);
        return;
    }

    axios
    .post("/parameters", { backupPath })
    .then((response) => {
        if (response.data.success) {
            setSuccess(response.data.success); // Update success state
            setErrors({}); // Clear errors
        }
    })
    .catch((error) => {
        if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors); // Ensure this is being called
            setSuccess(""); // Clear success
        } else {
            console.error(error);
        }
    });
};

const onSubmitRestore = () => {
    const restorePath = form.getValues("restorePath");
    const error = validateRestorePath(restorePath);

    if (error) {
        alert(error);
        return;
    }


    axios
    .get(`/parameters/restore?path=${encodeURIComponent(restorePath)}`)
    .then((response) => {
        if (response.data.success) {
            setSuccess(response.data.success); // Update success state
            setErrors({}); // Clear errors
        }
    })
    .catch((error) => {
        if (error.response && error.response.status === 422) {
            setErrors(error.response.data.errors); // Update errors state
            setSuccess(""); // Clear success
        } else {
            console.error(error);
        }
    });
};

const backupPath = form.watch("backupPath");
const restorePath = form.watch("restorePath");

const isBackupPathValid = !validateBackupPath(backupPath);
const isRestorePathValid = !validateRestorePath(restorePath);

    return (
        <MainLayout color="purple" subject="Paramètres">
            <div className="p-1">
            {success && (
                    <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                        {success}
                    </div>
                )}
                {errors && Object.keys(errors).length > 0 && (
                    <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
                        {Object.values(errors).map((errorArray, index) => (
                            <p key={index}>{errorArray}</p>
                        ))}
                    </div>
                )}
            </div>
            <Form {...form}>
                <form className="space-y-4 p-8">
                <h1 className="text-2xl">Paramètres</h1>
                <h2 className="text-xl">Backup</h2>
                    <div className="flex flex-row gap-4">
                        <div className="w-1/2 flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="backupPath"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sauvegarder*</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Chemin du répertoire (absolu)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Sauvegarder les données sur le chemin spécifié. <br />
                                            Ex : C:\Users\John\Desktop\backupZonta
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="bg-green-500 w-1/5"
                                type="button"
                                onClick={onSubmitBackup}
                                disabled={!isBackupPathValid}
                            >
                                Sauvegarder
                            </Button>
                        </div>
                        <div className="w-1/2 flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="restorePath"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Restaurer*</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Chemin du fichier SQL (absolu)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Restaure les données à partir du fichier SQL spécifié. <br />
                                            Ex : C:\Users\John\Desktop\backupZonta\backup2025.sqlite
                                        </FormDescription>
                                        <FormDescription style={{ color: "red" }}>
                                            Attention : Cette action est irréversible et remplacera toutes les données existantes.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="bg-blue-500 mt-2 w-1/5"
                                type="button"
                                onClick={onSubmitRestore}
                                disabled={!isRestorePathValid}
                            >
                                Restaurer
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </MainLayout>
    );
};

export default Index;