"use client"
import React, {useState} from 'react';
import {z} from "zod";
import {Input} from "@/Components/ui/input.jsx";
import {Button} from "@/Components/ui/button";
import {Checkbox} from "@/Components/ui/checkbox";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/Components/ui/select";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

const formSchema = z.object({
    order: z.object({
        quantity: z.preprocess((val) => Number(val), z.number({
            required_error: "Ce champ est requis.",
        }).min(1, {
            message: "La valeur doit être supérieure à 0.",
        }).nonnegative({
            message: "Le champ doit être un nombre positif.",
        }).int({
            message: "Le champ doit être un nombre entier.",
        })),
        contact: z.string().optional(),
        gifted_by: z.string().optional(),
        start_delivery_time: z.string().optional(),
        end_delivery_time: z.string().optional(),
        payment: z.string().optional(),
    }),
    person: z.object({
        phone_number: z.preprocess((val) => Number(val), z.number({
            required_error: "Ce champ est requis.",
        }).int({
            message: "Le champ doit être un nombre entier.",
        })),
        lastname: z.string({
            required_error: "Ce champ est requis.",
        }),
        firstname: z.string({
            required_error: "Ce champ est requis.",
        }),
    }),
    company: z.string().optional(),
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
    same_as_delivery: z.boolean().optional(),
    billingAddress: z.object({
        city: z.string().optional(),
        street: z.string().optional(),
        street_number: z.string().optional(),
        complement: z.string().optional(),
        npa: z.string().optional(),
    }),
    notification: z.boolean().optional(),
})

const CreateOrderForm = (contactPeopleNames) => {
    const [sameAsDelivery, setSameAsDelivery] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: undefined,
            phone_number: undefined,
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
                <div className="flex flex-row gap-4">
                    <div className="w-1/3 flex flex-col gap-2">
                        <h1 className="text-2xl">Commande</h1>
                        <FormField
                            control={form.control}
                            name="order.quantity"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nombre de gaufres*</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Nombre de gaufres" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Toutes les gaufres sont emballées dans des paquets de 5 unités.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <h1 className="text-2xl">Information du client</h1>
                        <FormField
                            control={form.control}
                            name="person.phone_number"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Téléphone*</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Numéro" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="person.firstname"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nom*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nom" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="person.lastname"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Prénom*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Prénom" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="order.contact"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Personne de contact</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selectionner votre personne de contact"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {contactPeopleNames.contactPeopleNames.map((person, i) => <SelectItem
                                                    key={i}
                                                    value={person.name}>{person.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="order.gifted_by"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Offert par</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Prénom Nom ou entreprise" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/3 flex flex-col gap-2">
                        <h1 className="text-2xl">Information de livraison</h1>
                        <FormField
                            control={form.control}
                            name="company"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Entreprise</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entreprise" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormLabel className="py-2">Rue et numéro*</FormLabel>
                        <div className="flex w-full flex-row gap-2 items-center">
                            <div className="flex-[2]">
                                <FormField
                                    control={form.control}
                                    name="deliveryAddress.street"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Rue" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="deliveryAddress.street_number"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" placeholder="Numéro" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="deliveryAddress.complement"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Complément d'adresse</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Complément" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormLabel className="py-2">NPA et localité*</FormLabel>
                        <div className="flex w-full flex-row gap-2 items-center">
                            <FormField
                                control={form.control}
                                name="deliveryAddress.npa"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="number" placeholder="npa" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deliveryAddress.city"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Localité" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormLabel className="py-2">Plage horaire de livraison*</FormLabel>
                        <div className="flex flex-row gap-2 items-center">
                            <span>De</span>
                            <FormField
                                control={form.control}
                                name="order.start_delivery_time"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="8:00" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <span>à</span>
                            <FormField
                                control={form.control}
                                name="order.end_delivery_time"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="18:00" {...field} />
                                        </FormControl>
                                        <FormMessage/>
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
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Mode de paiement</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selectionner un mode de paiement"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="au livreur">Au livreur</SelectItem>
                                                <SelectItem value="facture">Sur facture</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="same_as_delivery"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 my-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked);
                                                setSameAsDelivery(checked);
                                            }}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Utiliser l'adresse de livraison comme adresse de facturation
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {!sameAsDelivery && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="billingAddress.street"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Rue et numéro*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Rue" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="billingAddress.complement"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Complément d'adresse</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Complément" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormLabel className="py-2">NPA et localité*</FormLabel>
                                <div className="flex w-full flex-row gap-2 items-center">
                                    <FormField
                                        control={form.control}
                                        name="billingAddress.npa"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="number" placeholder="npa" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="billingAddress.city"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Localité" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="flex flex-col">
                        <h1 className="text-2xl">Valider la commander</h1>
                        <FormField
                            control={form.control}
                            name="notification"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 my-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Je shouaiterais recevoir des annonces sur les prochaines ventes
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-2">
                            <Button variant="destructive">Annuler</Button>
                            <Button className="bg-green-500" type="submit">Commander</Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}

export default CreateOrderForm;
