"use client";
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
import { format } from "date-fns";
import { Textarea } from "@/Components/ui/textarea";
import { PHONENUMBER_REGEX } from "@/lib/regex";
import { Checkbox } from "@/Components/ui/checkbox";
import { router } from "@inertiajs/react";
import { useEffect } from "react";

const formSchema = z.object({
    order: z.object({
        waffle_quantity: z.preprocess(
            (val) => Number(val),
            z
                .number({
                    required_error: "Ce champ est requis.",
                })
                .min(1, {
                    message: "La valeur doit être supérieure à 0.",
                })
                .nonnegative({
                    message: "Le champ doit être un nombre positif.",
                })
                .int({
                    message: "Le champ doit être un nombre entier.",
                })
        ),
        remark: z.string().optional(),
        free: z.boolean().optional(),
        gifted_by: z.string().optional(),
        start_delivery_time: z.string({
            required_error: "Ce champ est requis.",
        }),
        end_delivery_time: z.string({
            required_error: "Ce champ est requis.",
        }),
        payment: z.string({
            required_error: "Ce champ est requis.",
        }),
        date: z.string({
            required_error: "Ce champ est requis.",
        }),
    }),
    person: z
        .object({
            select_user: z.string({
                required_error: "Ce champ est requis.",
            }),
            phone_number: z
                .string()
                .regex(PHONENUMBER_REGEX, {
                    message:
                        "Le numéro de téléphone doit être au format 078 947 23 17.",
                })
                .optional(),
            lastname: z.string().optional(),
            firstname: z.string().optional(),
            company: z.string().optional(),
            email: z.string().email().optional(),
        })
        .refine(
            (data) =>
                data.select_user !== "new" ||
                (!!data.firstname && !!data.lastname) ||
                !!data.company,
            {
                message:
                    "Le nom et prénom ou l'entreprise doivent être renseignés pour un nouvel utilisateur.",
                path: ["firstname"],
            }
        )
        .refine(
            (data) =>
                data.select_user !== "new" ||
                !!data.email ||
                !!data.phone_number,
            {
                message:
                    "Le numéro de téléphone ou l'email doivent être renseignés pour un nouvel utilisateur.",
                path: ["email"],
            }
        ),
    deliveryAddress: z.object({
        city: z.string({
            required_error: "Ce champ est requis.",
        }),
        street: z.string({
            required_error: "Ce champ est requis.",
        }),
        street_number: z.string({
            required_error: "Ce champ est requis.",
        }),
        complement: z.string().optional(),
        npa: z.string({
            required_error: "Ce champ est requis.",
        }),
    }),
});

const CreateOrderForm = ({ contactPeopleNames, clientPeople, order = null  }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            waffle_quantity: undefined,
            phone_number: undefined,
        },
    });

    const onSubmit = (data) => {
        data.order.date = format(new Date(data.order.date), "yyyy-MM-dd");

        const payload = {
            ...data,
            order: {
                ...data.order,
            },
        };
        console.log(data)

        if (order?.id) {
            // Update existing order
            router.post(`/orders/${order.id}`, { ...payload, _method: "PUT" }, {
                onSuccess: () => {
                    window.location.href = "/orders";
                },
            });
        } else {
            // Create new order
            router.post("/orders", payload, {
                onSuccess: () => {
                    window.location.href = "/orders";
                },
            });
        }
    };
    useEffect(() => {
        if (order) {
            form.reset({
                order: {
                    waffle_quantity: order?.waffle_quantity || "",
                    date: order?.date || "",
                    contact: order?.contact_id ? String(order.contact_id) : "",
                    remark: order?.remark || "",
                    gifted_by: order?.gifted_by || "",
                    start_delivery_time: order?.start_delivery_time || "",
                    end_delivery_time: order?.end_delivery_time || "",
                    payment: order?.payment || "",
                },
                person: {
                    select_user:  order?.select_user_id ? String(order.select_user_id) : "",
                },
                deliveryAddress: {
                    city: order?.city || "",
                    street: order?.street || "",
                    street_number: order?.street_number || "",
                    complement: order?.complement || "",
                    npa: order?.npa || "",
                },
            });
        }
    }, [order]);
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 p-8"
            >
                <div className="flex flex-row gap-4">
                    <div className="w-1/3 flex flex-col gap-2">
                        <h1 className="text-2xl">Commande</h1>
                        <FormField
                            control={form.control}
                            name="order.waffle_quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de gaufres*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nombre de gaufres"
                                            defaultValue= {order?.waffle_quantity}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Toutes les gaufres sont emballées dans
                                        des paquets de 5 unités.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="order.date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date de la commande*</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date" {...field}
                                            defaultValue= {order?.date}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <h1 className="text-2xl">Information du client</h1>
                        <FormField
                            control={form.control}
                            name="person.select_user"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Utilisateur*</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={order ? order.select_user_id : field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir un utilisateur existant ou en créer un nouveau">
                                                    {field.value === "new"
                                                        ? field.innerText
                                                        : clientPeople.find(
                                                              (person) =>
                                                                  String(
                                                                      person.id
                                                                  ) ===
                                                                  String(field.value ? field.value : order?.select_user_id)

                                                          )?.name ||
                                                          "Choisir un utilisateur existant ou en créer un nouveau"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">
                                                    Créer un nouvel utilisateur
                                                </SelectItem>
                                                {clientPeople.map(
                                                    (person, i) => (
                                                        <SelectItem
                                                            key={i}
                                                            value={person.id}
                                                        >
                                                            {person.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* If the user is new, show the fields to create a new user */}
                        {form.watch("person.select_user") === "new" && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="person.firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nom"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="person.lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Prénom</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Prénom"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="person.email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email*"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="person.phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Téléphone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="Numéro"
                                                    pattern="\d{3} \d{3} \d{2} \d{2}"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Format : 079 123 45 67
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="person.company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Entreprise</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Entreprise"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        <FormField
                            control={form.control}
                            name="order.contact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Personne de contact</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={order ? order.contact_id : field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner votre personne de contact">
                                                    {contactPeopleNames.find(
                                                        (person) =>
                                                            String(
                                                                person.id
                                                            ) ===
                                                            String(field.value ? field.value : order?.contact_id)
                                                    )?.name ||
                                                        "Sélectionner votre personne de contact"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {contactPeopleNames.map(
                                                    (person, i) => (
                                                        <SelectItem
                                                            key={i}
                                                            value={person.id}
                                                        >
                                                            {person.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="order.gifted_by"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Offert par</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Prénom Nom ou entreprise"
                                            {...field}
                                            defaultValue={order?.gifted_by}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/3 flex flex-col gap-2">
                        <h1 className="text-2xl">Information de livraison</h1>
                        <FormLabel className="py-2">Rue et numéro*</FormLabel>
                        <div className="flex w-full flex-row gap-2 items-center">
                            <div className="flex-[2]">
                                <FormField
                                    control={form.control}
                                    name="deliveryAddress.street"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Rue"
                                                    {...field}
                                                    defaultValue={order?.street}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="deliveryAddress.street_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Numéro"
                                                    {...field}
                                                    defaultValue={order?.street_number}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="deliveryAddress.complement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Complément d'adresse</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Complément"
                                            {...field}
                                            defaultValue={order?.complement}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormLabel className="py-2">NPA et localité*</FormLabel>
                        <div className="flex w-full flex-row gap-2 items-center">
                            <FormField
                                control={form.control}
                                name="deliveryAddress.npa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="npa"
                                                {...field}
                                                defaultValue={order?.npa}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deliveryAddress.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Localité"
                                                {...field}
                                                defaultValue={order?.city}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormLabel className="py-2">
                            Plage horaire de livraison*
                        </FormLabel>
                        <div className="flex flex-row gap-2 items-center">
                            <span>De</span>
                            <FormField
                                control={form.control}
                                name="order.start_delivery_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="8:00"
                                                {...field}
                                                onBlur={(e) => {
                                                    if (!e.target.value) {
                                                        field.onChange(
                                                            e.target.placeholder
                                                        );
                                                    }
                                                }}
                                                defaultValue={order?.start_delivery_time}
                                            />
                                        </FormControl>
                                        <FormDescription></FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <span>à</span>
                            <FormField
                                control={form.control}
                                name="order.end_delivery_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="18:00"
                                                {...field}
                                                onBlur={(e) => {
                                                    if (!e.target.value) {
                                                        field.onChange(
                                                            e.target.placeholder
                                                        );
                                                    }
                                                }}
                                                defaultValue={order?.end_delivery_time}
                                            />
                                        </FormControl>
                                        <FormDescription></FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col gap-2">
                        <h1 className="text-2xl">Information de paiement</h1>
                        <FormField
                            control={form.control}
                            name="order.payment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mode de paiement*</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={order ? order.payment : field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selectionner un mode de paiement" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DELIVERY">
                                                    Au livreur
                                                </SelectItem>
                                                <SelectItem value="INVOICE">
                                                    Sur facture
                                                </SelectItem>
                                                <SelectItem value="UPSTREAM">
                                                    Déjà encaissé
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <h1 className="text-2xl">Remarque sur la commande</h1>
                        <FormField
                            control={form.control}
                            name="order.remark"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Remarque</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Ajouter des remarques si nécessaire"
                                            {...field}
                                            defaultValue={order?.remark}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="order.free"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Commande gratuite ? </FormLabel>
                                    <FormControl>
                                        <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            field.onChange(checked);
                                        }}
                                        defaultChecked={order?.free}
                                        ></Checkbox>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="flex flex-col">
                        <h1 className="text-2xl p-3 my-2">
                            Valider la commander
                        </h1>

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
                                Commander
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CreateOrderForm;
