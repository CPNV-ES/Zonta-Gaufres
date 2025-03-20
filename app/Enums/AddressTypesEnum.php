<?php

namespace App\Enums;

enum AddressTypesEnum: String
{
    case HOME = 'Domicile';
    case BILLING = 'Facturation';

    public static function fromCase(string $case): self
    {
        return constant("self::$case");
    }

    public function toArray(): array
    {
        return [
            'name' => $this->value,
            'key' => $this->name,
        ];
    }
}
