<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait RepoHasSimpleCrudActions
{

    /**
     * Delete Resource 
     *
     * @param int $id
     * @return void
     */
    public function delete($id)
    {
        DB::delete("DELETE FROM $this->table WHERE id = ?", [$id]);
    }

    /**
     * Select Resource By Id 
     *
     * @param int $id
     * @return mixed
     */
    public function selectOneById($id)
    {
        $res = DB::selectOne("SELECT * FROM $this->table WHERE id = ?", [$id]);
        return $res;
    }

    /**
     * Update Resource By Id
     *
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function update(int $id, array $data)
    {
        $setStatements = $this->getColumnsAndBindingsForUpdate(array_keys($data));

        DB::update(
            "UPDATE $this->table SET $setStatements WHERE id = :id",
            ['id' => $id] + $data
        );
    }

    /**
     * Create Resource
     *
     * @param array $data
     * @return void
     */
    public function create(array $data)
    {
        $columnsAndBindings = $this->getColumnsAndBindingsForInsert(array_keys($data));

        DB::insert("INSERT INTO {$this->table} $columnsAndBindings", array_values($data));
    }
}
