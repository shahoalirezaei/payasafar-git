"use client";

import { useEffect, useMemo, useState } from "react";
import moment from "jalali-moment";
import { useCalendarStore } from "@/store/zustand/useCalendarStore";
import { JALALI_HOLIDAYS } from "@/lib/data/jalaliHolidays";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import { useSearchStore } from "@/store/zustand/search.store";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export default function PersianDatePicker() {
  const { isCalendarOpen, setCalendarOpen, selectedDate, setSelectedDate } =
    useCalendarStore();
  const bus = useSearchStore((state) => state.bus);

  // 🔹 moment init فقط کلاینت
  useEffect(() => {
    moment.locale("fa");
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCalendarOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCalendarOpen]);

  // 🔹 ماهی که نمایش داده می‌شود
  const [shownMonth, setShownMonth] = useState<moment.Moment>(() =>
    moment().startOf("jMonth"),
  );

  // ===============================
  // 📅 helpers
  // ===============================

  const todayMoment = useMemo(() => moment().startOf("day"), []);

  function isDisabled(m: moment.Moment) {
    return m.isBefore(todayMoment, "day");
  }

  function isSameDay(a?: Date | null, b?: moment.Moment) {
    if (!a || !b) return false;
    return moment(a).isSame(b, "day");
  }

  // ===============================
  // 🧱 build grid (مثل vue تو)
  // ===============================

  function buildMonthGrid(m: moment.Moment) {
    const first = m.clone().startOf("jMonth");
    const end = m.clone().endOf("jMonth");

    const firstWeekday = (first.day() + 1) % 7;

    const cells: (moment.Moment | null)[] = [];

    for (let i = 0; i < firstWeekday; i++) cells.push(null);

    const daysCount = end.jDate();

    for (let d = 1; d <= daysCount; d++) {
      cells.push(m.clone().jDate(d).startOf("day"));
    }

    while (cells.length < 42) cells.push(null);

    return cells;
  }

  const monthA = useMemo(() => buildMonthGrid(shownMonth), [shownMonth]);
  const monthB = useMemo(
    () => buildMonthGrid(shownMonth.clone().add(1, "jMonth")),
    [shownMonth],
  );

  // ===============================
  // 🎯 select date
  // ===============================

  function selectDate(m: moment.Moment) {
    if (!m || isDisabled(m)) return;

    setSelectedDate(m.toDate());
  }

  // ===============================
  // 🧾 derived texts
  // ===============================

  const formattedInput = useMemo(() => {
    if (!selectedDate) return "";
    return moment(selectedDate).format("jYYYY/jMM/jDD");
  }, [selectedDate]);

  const dayOfWeek = useMemo(() => {
    if (!selectedDate) return "";
    return moment(selectedDate).format("dddd");
  }, [selectedDate]);

  const relativeText = useMemo(() => {
    if (!selectedDate) return "";

    const diff = moment(selectedDate).startOf("day").diff(todayMoment, "days");

    if (diff === 0) return "امروز";
    if (diff === 1) return "فردا";
    if (diff > 1) return `${diff} روز بعد`;
    if (diff === -1) return "دیروز";
    return `${Math.abs(diff)} روز قبل`;
  }, [selectedDate, todayMoment]);

  function goToToday() {
    const t = moment().startOf("day");
    setSelectedDate(t.toDate());
    setShownMonth(t.clone().startOf("jMonth"));
  }

  // ===============================
  // 🎨 UI
  // ===============================

  return (
    <div className="relative w-full text-right">
      {/* modal */}
      {isCalendarOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/65 flex items-center justify-center md:p-4"
          onClick={() => setCalendarOpen(false)}
        >
          <div
            className="bg-white relative rounded-[21px] w-full max-w-[882px] pt-[22px] mt-1 h-full md:h-auto md:mt-0 overflow-y-scroll md:overflow-y-hidden  animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن هنگام کلیک داخل modal
            role="dialog"
            aria-modal="true"
          >
            {/* header */}
            <div className="flex items-center justify-between mb-7 bg-[#FCFDFF] pr-11 pl-[22px]">
              <button
                onClick={goToToday}
                className="blue600 font-semibold text-[14px]"
              >
                برو به امروز
              </button>

              <h3 className="font-semibold text-[20px] text-black">
                {" "}
                انتخاب تاریخ بلیط
              </h3>

              <button
                className="w-11 h-11 font-bold text-[#00418E] text-[20px]"
                onClick={() => setCalendarOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* months */}
            <div className="flex gap-y-4 flex-col md:flex-row justify-between items-center mx-auto max-w-[790px] md:border-b md:border-b-[#ECECEC]">
              <MonthView
                title={shownMonth.locale("fa").format("jMMMM jYYYY")}
                cells={monthA}
                selectedDate={selectedDate}
                onSelect={selectDate}
                isDisabled={isDisabled}
                isSameDay={isSameDay}
                showWeekdays={true}
              />

              <MonthView
                title={shownMonth
                  .clone()
                  .add(1, "jMonth")
                  .format("jMMMM jYYYY")}
                cells={monthB}
                selectedDate={selectedDate}
                onSelect={selectDate}
                isDisabled={isDisabled}
                isSameDay={isSameDay}
                showWeekdays={"desktop-only"}
              />
            </div>
            { (bus.origin.title && bus.destination.title) ? (
              <div className="bg-white flex flex-col md:flex-row justify-between items-center md:gap-10  w-full rounded-t-[35px] sticky z-10 bottom-0 md:rounded-b-[21px] md:rounded-t-none  right-0 shadow-[0px -30px 38.1px 0px rgba(64, 64, 64, 0.17)] py-7 pr-9 pl-6">
              <div className="flex justify-between md:w-1/2  md:order-2">
                <div className="flex flex-col ">
                  <span className="text-[#445C9D] text-[12px] font-semibold">
                    مسیر انتخاب شده:
                  </span>
                  <div className="flex items-center justify-start blue600 gap-1 text-[16px] sm:text-[20px] font-semibold">
                    <p>{bus.origin.title}</p>
                    <Icon
                      name="solar--arrow-left-broken"
                      className="blue600"
                      size={20}
                    />
                    <p>{bus.destination.title}</p>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <span className="text-[#445C9D] text-[12px] font-semibold">
                    تاریخ انتخاب شده:
                  </span>
                  <div className="flex items-center justify-start blue600 gap-1 text-[16px] sm:text-[20px] font-semibold">
                    <p>
                      {selectedDate
                        ? moment(selectedDate).format("jDD jMMMM")
                        : ""}
                    </p>
                    <p className="text-[#6C93E5]">
                      {selectedDate ? moment(selectedDate).format("dddd") : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-5 px-5 mt-auto w-full md:w-1/3 md:p-0  bg-white  md:order-0">
                <button className="w-full py-4 big-btn-blue text-white rounded-[10px] font-semibold flex justify-center items-center gap-1.5  active:scale-[0.98] transition-transform">
                  <Icon
                    name="solar--arrow-left-broken"
                    className=" rotate-180"
                    size={20}
                  />
                  مشاهده‌ی بلیط
                </button>
              </div>
            </div>
            ) : (
              <div className="py-4 w-full bg-white"></div>
            )
            
            
            
            
            }
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  title: string;
  cells: (moment.Moment | null)[];
  selectedDate: Date | null;
  onSelect: (m: moment.Moment) => void;
  isDisabled: (m: moment.Moment) => boolean;
  isSameDay: (a?: Date | null, b?: moment.Moment) => boolean;
  showWeekdays?: boolean | "desktop-only";
}

function isOfficialHoliday(m: moment.Moment) {
  const key = m.format("jMM-jDD");
  return JALALI_HOLIDAYS.includes(key);
}

function MonthView({
  title,
  cells,
  selectedDate,
  onSelect,
  isDisabled,
  isSameDay,
  showWeekdays,
}: Props) {
  return (
    <div className="flex flex-col">
      {/* weekdays */}
      {showWeekdays && (
        <div
          className={cn(
            "grid grid-cols-7 text-center mb-5 bg-white shadow-box h-[45px] items-center px-[26px] -ml-3 -mr-2",
            showWeekdays === "desktop-only" && "hidden md:grid",
          )}
        >
          {WEEKDAYS.map((d) =>
            d === "ج" ? (
              <span
                key={d}
                className="text-[20px] font-semibold text-[#FF0000]"
              >
                {d}
              </span>
            ) : (
              <span
                key={d}
                className="text-[20px] font-semibold text-[#999999]"
              >
                {d}
              </span>
            ),
          )}
        </div>
      )}
      <div className="w-full px-5 mx-auto shadow-box">
        <h3 className="text-center font-semibold text-[11px] md:text-[16px] text-black mb-[18px] md:mb-[13px]">
          {title}
        </h3>

        {/* grid */}
        <div className="grid grid-cols-7 gap-x-[11px] gap-y-[12px]">
          {cells.map((cell, idx) => {
            if (!cell) return <div key={idx} />;

            const disabled = isDisabled(cell);
            const selected = isSameDay(selectedDate, cell);

            const isFriday = cell.day() === 5;
            const officialHoliday = isOfficialHoliday(cell);

            // 👇 روز قرمز نهایی
            const isRedDay = isFriday || officialHoliday;

            return (
              <button
                key={idx}
                disabled={disabled}
                onClick={() => onSelect(cell)}
                className={cn(
                  "w-[46px] h-[46px] flex justify-center items-center rounded-[6px] text-[20px] font-semibold bg-[#F3F3F3]",
                  "hover:bg-orange-200",

                  // ✅ حالت انتخاب شده (بالاترین اولویت)
                  selected && "bg-[#FF9A0D] text-white",

                  // ✅ تعطیل و فعال
                  !selected && isRedDay && !disabled && "text-[#FF0000]",

                  // ✅ تعطیل ولی غیرفعال
                  !selected &&
                    isRedDay &&
                    disabled &&
                    "text-[#FF6F6F] cursor-not-allowed bg-transparent",

                  // ✅ روز عادی غیرفعال
                  !selected &&
                    !isRedDay &&
                    disabled &&
                    "text-[#CDCDCD] cursor-not-allowed bg-transparent",

                  // ✅ حالت عادی
                  !selected && !disabled && !isRedDay && "text-[#7A7A7A]",
                )}
              >
                {cell.jDate()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
