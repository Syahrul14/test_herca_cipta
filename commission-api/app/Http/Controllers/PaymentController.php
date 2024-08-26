<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Selling;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    public function index()
    {
        return Payment::with('selling')->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'selling_id' => 'required|exists:selling,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $payment = Payment::create($request->all());

        return response()->json($payment, 201);
    }
}
