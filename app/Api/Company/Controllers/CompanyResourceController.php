<?php

namespace App\Api\Company\Controllers;

use App\Api\Company\Repositories\CompanyRepository;
use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Api\Company\Requests\CreateCompanyRequest;
use App\Api\Company\Requests\DeleteCompanyRequest;
use App\Api\Company\Requests\UpdateCompanyRequest;
use App\Response\NotificateUser;

class CompanyResourceController
{
    public function save(CompanyRepository $companyRepository, CreateCompanyRequest $request)
    {
        $companyRepository->create([
            'name'         => $request->getName(),
            'code'         => $request->getCode(),
            'address'      => $request->getAddress(),
            'phone_number' => $request->getPhoneNumber(),
            'email'        => $request->getEmail(),
            'user_id'      => $request->user()->id
        ]);

        return NotificateUser::create('Company Successfylly Saved');
    }

    public function udpate(CompanyRepository $companyRepository, UpdateCompanyRequest $request)
    {
        $companyRepository->update($request->getId(), [
            'name'         => $request->getName(),
            'code'         => $request->getCode(),
            'address'      => $request->getAddress(),
            'phone_number' => $request->getPhoneNumber(),
            'email'        => $request->getEmail(),
            'user_id'      => $request->user()->id
        ]);

        return NotificateUser::create('Company Successfylly Updated');
    }

    public function getSingle(CompanyRepository $companyRepository, $id)
    {
        $company = $companyRepository->selectOneById($id);

        return (array) $company;
    }

    public function delete(CompanyRepository $companyRepository, DeleteCompanyRequest $request, $id)
    {
        $companyRepository->delete($id);

        return NotificateUser::create('Company Successfylly Deleted');
    }

    public function list(CompanyRepository $companyRepository, Request $request)
    {
        list($_, $_, $page) = $request->getPaginationData();

        return response()->json([
            'data'       => $companyRepository->listUserCompaies($request->user()),
            'page'       => $page,
            'totalCount' => $companyRepository->getUserCompaniesCount($request->user()),
        ]);
    }
}
