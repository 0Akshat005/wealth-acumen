"use client";

import { useState, useMemo, useEffect } from "react";
import { brand } from "@/config/brand";

export function CompoundingCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(15);
  const [delayYears, setDelayYears] = useState(1);

  // Sync delayYears when tenure years is updated
  useEffect(() => {
    if (delayYears >= years && years > 1) {
      setTimeout(() => {
        setDelayYears(years - 1);
      }, 0);
    }
  }, [years, delayYears]);

  const result = useMemo(() => {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const totalInvested = monthlyInvestment * months;
    const futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const wealthGained = futureValue - totalInvested;

    return {
      totalInvested,
      futureValue: Math.round(futureValue),
      wealthGained: Math.round(wealthGained),
    };
  }, [monthlyInvestment, annualRate, years]);

  const delayResult = useMemo(() => {
    const monthlyRate = annualRate / 12 / 100;
    const totalMonthsOriginal = years * 12;
    const fvOriginal = result.futureValue;

    // Active duration if starting after delay
    const activeDelay = delayYears >= years ? Math.max(1, years - 1) : delayYears;
    const activeMonthsDelayed = Math.max(0, (years - activeDelay) * 12);
    
    const factorDelayed = activeMonthsDelayed > 0
      ? ((Math.pow(1 + monthlyRate, activeMonthsDelayed) - 1) / monthlyRate) * (1 + monthlyRate)
      : 0;

    const fvDelayed = monthlyInvestment * factorDelayed;
    const lostWealth = fvOriginal - fvDelayed;

    // Calculate required monthly contribution to reach fvOriginal in activeMonthsDelayed
    const requiredSipToCatchUp = factorDelayed > 0 ? fvOriginal / factorDelayed : 0;
    const sipPremium = requiredSipToCatchUp > monthlyInvestment
      ? Math.round(requiredSipToCatchUp - monthlyInvestment)
      : 0;

    const delayedInvested = monthlyInvestment * activeMonthsDelayed;
    const delayedGained = fvDelayed - delayedInvested;

    return {
      lostWealth: Math.max(0, Math.round(lostWealth)),
      requiredSipToCatchUp: Math.round(requiredSipToCatchUp),
      sipPremium: Math.max(0, sipPremium),
      fvDelayed: Math.round(fvDelayed),
      delayedGained: Math.max(0, Math.round(delayedGained))
    };
  }, [monthlyInvestment, annualRate, years, delayYears, result.futureValue]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const investedPercentage =
    (result.totalInvested / result.futureValue) * 100;

  return (
    <div className="glass rounded-2xl p-8 md:p-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Sliders */}
        <div className="space-y-8">
          {/* Monthly Investment */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-700">
                Monthly Investment (SIP)
              </label>
              <span className="text-sm font-bold text-[#D9791A]">
                {formatCurrency(monthlyInvestment)}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>&#8377;500</span>
              <span>&#8377;1,00,000</span>
            </div>
          </div>

          {/* Annual Rate */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-700">
                Expected Annual Return
              </label>
              <span className="text-sm font-bold text-cyan-600">
                {annualRate}%
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={0.5}
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Time Period */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-700">
                Time Period
              </label>
              <span className="text-sm font-bold text-amber-600">
                {years} Years
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col items-center justify-center">
          {/* Donut Chart */}
          <div className="relative w-48 h-48 mb-8">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="12"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeDasharray={`${investedPercentage * 3.14} ${
                  (100 - investedPercentage) * 3.14
                }`}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E8A33D" />
                  <stop offset="100%" stopColor="#C9670A" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs text-slate-500">Total Value</p>
              <p className="font-[family-name:var(--font-outfit)] text-lg font-bold text-slate-900">
                {formatCurrency(result.futureValue)}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50/50 border border-orange-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D9791A]" />
                <span className="text-sm text-slate-700 font-medium">Invested Amount</span>
              </div>
              <span className="text-sm font-bold text-slate-900">
                {formatCurrency(result.totalInvested)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-50/40 border border-cyan-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="text-sm text-slate-700 font-medium">Wealth Gained</span>
              </div>
              <span className="text-sm font-bold text-slate-900">
                {formatCurrency(result.wealthGained)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost of Delaying Section */}
      {years > 1 && (
        <div className="mt-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-red-500">⏳</span> Opportunity Cost of Delaying
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                See the real price of waiting to start. Procrastination is a silent tax on your compounding wealth.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-start lg:self-auto border border-slate-200">
              <span className="text-xs text-slate-500 font-bold px-2 whitespace-nowrap">Delay Starting:</span>
              {[1, 2, 3, 5].filter((d) => d < years).map((d) => (
                <button
                  key={d}
                  onClick={() => setDelayYears(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    delayYears === d
                      ? "bg-[#D9791A] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-200"
                  }`}
                >
                  {d} {d === 1 ? "Year" : "Years"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Lost Compound Value Card */}
            <div className="rounded-2xl border border-red-200/80 bg-red-50/30 p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/[0.02] rounded-full blur-xl pointer-events-none" />
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100/60 px-2.5 py-1 rounded-full mb-4">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Lost Compound Wealth
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  Delaying your investment by <strong className="text-red-700">{delayYears} {delayYears === 1 ? "year" : "years"}</strong> will reduce your maturity value by:
                </p>
                <p className="text-3xl sm:text-4xl font-[family-name:var(--font-outfit)] font-black text-red-600 mt-3 tracking-tight">
                  -{formatCurrency(delayResult.lostWealth)}
                </p>
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-red-100/50">
                Maturity drops from <span className="font-semibold">{formatCurrency(result.futureValue)}</span> to <span className="font-semibold text-slate-700">{formatCurrency(delayResult.fvDelayed)}</span>.
              </p>
            </div>

            {/* Catch-Up Penalty Card */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.02] rounded-full blur-xl pointer-events-none" />
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full mb-4">
                  <span>📈</span> Catch-Up Penalty
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  To still reach your original goal of <strong className="text-slate-900">{formatCurrency(result.futureValue)}</strong> in {years} years, you must invest:
                </p>
                <p className="text-3xl sm:text-4xl font-[family-name:var(--font-outfit)] font-black text-slate-900 mt-3 tracking-tight">
                  {formatCurrency(delayResult.requiredSipToCatchUp)} <span className="text-xs sm:text-sm font-normal text-slate-500">/ month</span>
                </p>
                <p className="text-xs text-amber-800 font-semibold mt-2.5 bg-amber-100/30 px-3 py-1.5 rounded-lg border border-amber-200/30">
                  ⚠️ That&apos;s an extra <strong>{formatCurrency(delayResult.sipPremium)}/month</strong> (+{Math.round((delayResult.sipPremium / monthlyInvestment) * 100)}% higher commitment) for the remaining {years - delayYears} years.
                </p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 border-t border-amber-100/50 pt-4">
                <a
                  href={brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs w-full text-center py-3 px-4 font-bold flex items-center justify-center gap-2 group shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  <span>Start Now & Avoid this Loss</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
