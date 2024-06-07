<?php

namespace App\Enums;

enum PersonTypesEnum: String
{
    case ADMIN = 'Admin';
    case DELIVERY_GUY = 'Livreur';
    case STAFF = 'Bénévole';

    public static function fromCase(string $case): self
    {
        return constant("self::$case");
    }
}
