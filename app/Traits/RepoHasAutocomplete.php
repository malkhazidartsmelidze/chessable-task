<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait RepoHasAutoComplete
{
    private $autoCompleteColumn = 'name';

    /**
     * Return autocomplete for Resource
     *
     * @param string|null $q
     * @return void
     */
    public function autoComplete($q): array
    {
        return DB::select("SELECT 
            id, 
            $this->autoCompleteColumn 
        FROM {$this->table} 
        WHERE $this->autoCompleteColumn 
        LIKE ? LIMIT 5", ["%$q%"]);
    }
}
