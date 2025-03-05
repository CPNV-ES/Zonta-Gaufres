<?php

namespace App\Enums;

enum PaymentTypesEnum: int
{
    case UPSTREAM = 1; //en amont
    case DELIVERY = 2; //livraison
    case INVOICE = 3; //facture

    public static function fromCase(string $case): self
    {
        return constant("self::{$case}");
    }
}
