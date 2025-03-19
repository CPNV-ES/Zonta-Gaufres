<?php

namespace App\Enums;

enum PaymentTypesEnum: string
{
    case UPSTREAM = "En amont"; 
    case DELIVERY = "Livraison"; 
    case INVOICE = "Facture";

    public static function fromCase(string $case): self
    {
        return constant("self::{$case}");
    }
}
