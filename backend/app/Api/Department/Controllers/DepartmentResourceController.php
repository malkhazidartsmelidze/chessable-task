<?php

namespace App\Api\Department\Controllers;

use App\Api\Department\Repositories\DepartmentRepository;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Api\Department\Requests\CreateDepartmentRequest;
use App\Api\Department\Requests\DeleteDepartmentRequest;
use App\Api\Department\Requests\UpdateDepartmentRequest;
use App\Response\NotificateUser;

class DepartmentResourceController
{
    public function list(DepartmentRepository $departmentRepository, Request $request)
    {
        list($_, $_, $page) = $request->getPaginationData();

        return response()->json([
            'data'       => $departmentRepository->listUserDepartments($request->user()),
            'page'       => $page,
            'totalCount' => $departmentRepository->getDepartmentsCount(),
        ]);
    }

    public function save(DepartmentRepository $departmentRepository, CreateDepartmentRequest $request)
    {
        $departmentRepository->create([
            'name'       => $request->getName(),
        ]);

        return NotificateUser::create('Department Successfylly Saved');
    }

    public function udpate(DepartmentRepository $departmentRepository, UpdateDepartmentRequest $request)
    {
        $departmentRepository->update($request->getId(), [
            'name'       => $request->getName(),
        ]);

        return NotificateUser::create('Department Successfylly Updated');
    }

    public function getSingle(DepartmentRepository $departmentRepository, $id)
    {
        $department = $departmentRepository->selectOneById($id);

        if (!$department) abort(404);

        return (array) $department;
    }

    public function delete(DepartmentRepository $departmentRepository, DeleteDepartmentRequest $_, $id)
    {
        $departmentRepository->delete($id);

        return NotificateUser::create('Department Successfylly Deleted');
    }

    public function autoComplete(DepartmentRepository $departmentRepository, Request $request)
    {
        $request->validate(['q' => 'nullable|string']);

        return response()->json([
            'data' => $departmentRepository->autoComplete($request->q),
        ]);
    }
}
