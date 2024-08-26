<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class CommissionRepository
{
    public function getCommissionPerMarketing()
    {
        return DB::table('selling')
            ->leftJoin('marketing', 'selling.marketing_id', '=', 'marketing.id')
            ->select(
                'selling.marketing_id',
                'marketing.name',
                DB::raw('SUM(selling.grand_total) as omzet'),
                DB::raw('MONTH(selling.date) as month')
            )
            ->groupBy('selling.marketing_id', 'marketing.name', DB::raw('MONTH(selling.date)'))
            ->orderBy('month')
            ->orderBy('omzet', 'desc')
            ->get()
            ->map(function($item) {
                $commissionPercent = $this->calculateCommissionPercent($item->omzet);
                $item->commission_percent = $commissionPercent;
                $item->commission_nominal = ($commissionPercent / 100) * $item->omzet;
                $item->month = $this->getMonthName($item->month);
                return $item;
            });
    }

    private function calculateCommissionPercent($omzet)
    {
        if ($omzet >= 500000000) {
            return 10;
        } elseif ($omzet >= 200000000) {
            return 5;
        } elseif ($omzet >= 100000000) {
            return 2.5;
        } else {
            return 0;
        }
    }

    private function getMonthName($monthNumber)
  {
      $months = [
          1 => 'Januari',
          2 => 'Februari',
          3 => 'Maret',
          4 => 'April',
          5 => 'Mei',
          6 => 'Juni',
          7 => 'Juli',
          8 => 'Augustus',
          9 => 'September',
          10 => 'October',
          11 => 'November',
          12 => 'December',
      ];

      return $months[$monthNumber] ?? 'Unknown';
  }
}