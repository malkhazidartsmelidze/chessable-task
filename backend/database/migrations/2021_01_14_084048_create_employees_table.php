<?php

use App\Models\Department;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('department_id');
            $table->string('name', 50)->nullable();
            $table->string('lastname', 50)->nullable();
            $table->string('address', 80)->nullable();
            $table->string('bank_account', 50)->nullable();
            $table->double('salary')->default(0);
            $table->timestamps();

            $table->foreign('department_id')->references('id')->on(Department::TABLE)->onUpdate('cascade')->onDelete('cascade');
            $table->index('department_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
