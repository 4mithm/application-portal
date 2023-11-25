<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentinfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->bigInteger('rid');
            $table->foreign('rid')->references('rid')->on('registers')->onDelete('cascade')->onUpdate('cascade');
            $table->string('aid')->nullable();
            $table->string('course');
            $table->date('dob');
            $table->string('phone');
            $table->string('gender');
            $table->string('fathername');
            $table->integer('pumark');
            $table->string('address');
            $table->string('photo');
            $table->string('pumarkscard');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applications');
    }
}
