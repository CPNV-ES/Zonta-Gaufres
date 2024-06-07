<?php

namespace App\Enums;

enum InvoiceStatusEnum: string
{
    case PAID = 'Payée';
    case OPEN = 'Ouverte';
    case CANCELED = 'Annulée';
    case INPROGRESS = 'En cours';
    
    public static function fromCase(string $case): self
    {
        return constant("self::$case");
    }
}