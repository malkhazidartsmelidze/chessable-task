<?php

namespace App\Helpers;

class Repository
{

    /**
     * Get colummns and bindings for update Statement
     * @example input: id, user_id | output: id = :id, user_id = :user_id
     * @param array $arr
     * @return string
     */
    public function getColumnsAndBindingsForUpdate($arr): string
    {
        return trim(array_reduce($arr, function ($c, $i) {
            return $c . "$i = :$i,";
        }, ''), ',');
    }

    /**
     * Get colummns and bindings for insert Statement
     * @example input: id, user_id | (id, user_id) VALUES (?,?)
     * @param array $arr
     * @return string
     */
    public function getColumnsAndBindingsForInsert($arr): string
    {
        $columns = join(',', $arr);
        $bindings = join(',', array_fill(0, count($arr), '?'));

        return "($columns) VALUES ($bindings)";
    }
}
