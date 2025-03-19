<?php

namespace App\Enums;

enum InvoiceStatusEnum: string
{
    case PAID = 'PAID';
    case OPEN = 'OPEN';
    case CANCELED = 'CANCELED';
    case INPROGRESS = 'INPROGRESS';

    public static function fromCase(string $case): self
    {
        return constant("self::$case");
    }

    public function displayName(): string
    {
        return match ($this) {
            self::PAID => 'Payée',
            self::OPEN => 'Ouverte',
            self::CANCELED => 'Annulée',
            self::INPROGRESS => 'En cours',
        };
    }
}
