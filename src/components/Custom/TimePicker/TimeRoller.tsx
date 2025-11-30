"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

/* ---------------------- انواع کمکی ---------------------- */

type SingleTime = {
  hour: number;   // 0..23
  minute: number; // فقط 0 یا 30
};

interface SingleTimeRollerProps {
  value?: string;               // "HH:MM"
  onChange?: (value: string) => void;
}

/* تبدیل استرینگ → ساعت و دقیقه */
function parseTime(value?: string): SingleTime {
  if (!value) return { hour: 0, minute: 0 };

  const [hStr, mStr] = value.split(":");
  let h = Number(hStr);
  const m = Number(mStr ?? "0");

  if (!Number.isFinite(h) || h < 0 || h > 23) h = 0;
  const minute = m === 30 ? 30 : 0;

  return { hour: h, minute };
}

/* تبدیل ساعت/دقیقه → استرینگ */
function formatTime({ hour, minute }: SingleTime): string {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

/* ---------------------- رولر تک زمان (HH / MM) ---------------------- */

const SingleTimeRoller: React.FC<SingleTimeRollerProps> = ({ value, onChange }) => {
  const [state, setState] = React.useState<SingleTime>(() => parseTime(value));

  React.useEffect(() => {
    setState(parseTime(value));
  }, [value]);

  const emit = (next: SingleTime) => {
    setState(next);
    onChange?.(formatTime(next));
  };

  const incHour = () =>
    emit({ ...state, hour: (state.hour + 1) % 24 });

  const decHour = () =>
    emit({ ...state, hour: (state.hour + 23) % 24 });

  const toggleMinute = () =>
    emit({ ...state, minute: state.minute === 0 ? 30 : 0 });

  const H = state.hour.toString().padStart(2, "0");
  const M = state.minute.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1" dir="ltr">
      {/* فلش‌های بالا */}
      <div className="flex items-center gap-6">
        {/* ساعت */}
        <button
          type="button"
          onClick={incHour}
          className="text-orange-500 hover:text-orange-600"
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        {/* دقیقه */}
        <button
          type="button"
          onClick={toggleMinute}
          className="text-orange-500 hover:text-orange-600"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>

      {/* نمایش عددی */}
      <div className="flex items-center gap-3 text-lg font-semibold text-slate-800 tabular-nums">
        <span className="w-8 text-center">{H}</span>
        <span className="text-base text-slate-500">:</span>
        <span className="w-8 text-center">{M}</span>
      </div>

      {/* فلش‌های پایین */}
      <div className="flex items-center gap-6">
        {/* ساعت */}
        <button
          type="button"
          onClick={decHour}
          className="text-orange-500 hover:text-orange-600"
        >
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* دقیقه */}
        <button
          type="button"
          onClick={toggleMinute}
          className="text-orange-500 hover:text-orange-600"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

/* ---------------------- تایم‌پیکر رنج (از / تا) ---------------------- */

export interface TimePickerRollerProps {
  from?: string;
  to?: string;
  onChangeFrom?: (value: string) => void;
  onChangeTo?: (value: string) => void;
  onClose?: () => void;
}

export const TimePickerRoller: React.FC<TimePickerRollerProps> = ({
  from,
  to,
  onChangeFrom,
  onChangeTo,
  onClose,
}) => {
  return (
    <div className="rounded-[32px] border border-[#ECECF5] bg-[#F7F7F9] px-8 py-5 shadow-xl">

      {/* از / تا */}
      <div className="flex items-center justify-center gap-16">

        {/* از */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">از</span>
          <SingleTimeRoller value={from} onChange={onChangeFrom} />
        </div>

        {/* تا */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">تا</span>
          <SingleTimeRoller value={to} onChange={onChangeTo} />
        </div>

      </div>

      {/* دکمه بستن – دقیقاً پایینِ سمت چپ */}
      {onClose && (
        <div className="mt-6 flex justify-end" dir="rtl">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-orange-100 px-5 py-1.5 text-xs font-medium text-orange-600 hover:bg-orange-200"
          >
            بستن
          </button>
        </div>
      )}
    </div>
  );
};
