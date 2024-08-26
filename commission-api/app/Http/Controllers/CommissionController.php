<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CommissionRepository;

class CommissionController extends Controller
{
    protected $commissionRepository;

    public function __construct(CommissionRepository $commissionRepository)
    {
        $this->commissionRepository = $commissionRepository;
    }

    public function getCommissionPerMarketing()
    {
        $data = $this->commissionRepository->getCommissionPerMarketing();
        return response()->json($data);
    }
}
