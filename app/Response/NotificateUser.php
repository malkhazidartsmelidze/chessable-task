<?php

namespace App\Response;

use Illuminate\Contracts\Support\Arrayable;

class NotificateUser implements Arrayable
{
    /**
     * Notification Text 
     *
     * @var string
     */
    private $text;

    /**
     * Notification Status
     *
     * @var string
     */
    private $status;

    /**
     * Notification options
     *
     * @var array
     */
    private $options;

    public function __construct(
        string $text,
        ?string $status = 'success',
        ?array $options = []
    ) {
        $this->text = $text;
        $this->status = $status;
        $this->options = $options;
    }

    public function toArray(): array
    {
        return [
            '_notification' => [
                'text'    => $this->text,
                'status'  => $this->status,
                'options' => $this->options
            ],
        ];
    }

    /**
     * Create New Response Instance
     * 
     * @param mixed $params
     */
    public static function create(...$params)
    {
        return new static(...$params);
    }
}
