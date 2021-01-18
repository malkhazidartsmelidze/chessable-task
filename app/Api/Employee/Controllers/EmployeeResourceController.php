<?php

namespace App\Api\Employee\Controllers;

use App\Api\Employee\Repositories\EmployeeRepository;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Api\Employee\Requests\CreateEmployeeRequest;
use App\Api\Employee\Requests\DeleteEmployeeRequest;
use App\Api\Employee\Requests\UpdateEmployeeRequest;
use App\Response\NotificateUser;

class EmployeeResourceController
{
    public function list(EmployeeRepository $employeeRepository, Request $request)
    {
        list($_, $_, $page) = $request->getPaginationData();

        return response()->json([
            'data'       => $employeeRepository->listUserEmployees($request->user()),
            'page'       => $page,
            'totalCount' => $employeeRepository->getUserEmployeesCount($request->user()),
        ]);
    }

    public function save(EmployeeRepository $employeeRepository, CreateEmployeeRequest $request)
    {
        $employeeRepository->create([
            'name'          => $request->getName(),
            'department_id' => $request->getDepartmentDd(),
            'lastname'      => $request->getLastname(),
            'bank_account'  => $request->getBankAccount(),
            'address'       => $request->getAddress(),
            'salary'        => $request->getSalary(),
        ]);

        return NotificateUser::create('Employee Successfylly Saved');
    }

    public function udpate(EmployeeRepository $employeeRepository, UpdateEmployeeRequest $request)
    {
        $employeeRepository->update($request->getId(), [
            'name'          => $request->getName(),
            'department_id' => $request->getDepartmentDd(),
            'lastname'      => $request->getLastname(),
            'bank_account'  => $request->getBankAccount(),
            'address'       => $request->getAddress(),
            'salary'        => $request->getSalary(),
        ]);

        return NotificateUser::create('Employee Successfylly Updated');
    }

    public function getSingle(EmployeeRepository $employeeRepository, $id)
    {
        $employee = $employeeRepository->selectOneById($id);

        if (!$employee) abort(404);

        $employee->department_id = $employeeRepository->getDepartment($employee);

        return (array) $employee;
    }

    public function delete(EmployeeRepository $employeeRepository, DeleteEmployeeRequest $request, $id)
    {
        $employeeRepository->delete($id);

        return NotificateUser::create('Employee Successfylly Deleted');
    }
}
