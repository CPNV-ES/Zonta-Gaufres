<?php

namespace App\Enums;

enum PersonTypesEnum: String
{
    case ADMIN = 'Admin';
    case DELIVERY_GUY = 'Livreur';
    case STAFF = 'Bénévole';
    case CLIENT = 'Client';

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
