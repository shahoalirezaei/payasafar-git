"use client";
import React, { useMemo, useState } from "react";

/** Types */
type Pattern = "1+2" | "2+2";
type SeatStatus = "available" | "booked" | "disabled";

interface Seat {
  id: string;
  number: number;
  status: SeatStatus;
}

type NullableSeat = Seat | null;

interface Row {
  left: NullableSeat[]; // left side positions (length depends on pattern)
  right: NullableSeat[]; // right side positions
  isRear?: boolean;
}

interface BusSpec {
  pattern: Pattern;
  totalSeats: number;
  rearBlock?: number;
}

interface BusLayout {
  rows: Row[];
}

/** Config (ظرفیت‌هایی که مشخص کردی) */
const BUS_CONFIG: Record<number, BusSpec> = {
  25: { pattern: "1+2", totalSeats: 25, rearBlock: 1 },
  26: { pattern: "1+2", totalSeats: 26, rearBlock: 2 },
  30: { pattern: "1+2", totalSeats: 30, rearBlock: 3 },
  44: { pattern: "2+2", totalSeats: 44, rearBlock: 4 },
};

/** Helper to create Seat object */
function makeSeat(n: number): Seat {
  return { id: String(n), number: n, status: "available" };
}

/**
 * Build empty rows structure (with null placeholders) based on pattern and rowCount.
 * leftCount/rightCount are fixed per pattern:
 * - "1+2": leftCount = 1, rightCount = 2 (seatsPerRow = 3)
 * - "2+2": leftCount = 2, rightCount = 2 (seatsPerRow = 4)
 */
function buildEmptyRows(pattern: Pattern, rowCount: number): Row[] {
  const rows: Row[] = [];
  const leftCount = pattern === "1+2" ? 1 : 2;
  const rightCount = pattern === "1+2" ? 2 : 2;

  for (let i = 0; i < rowCount; i++) {
    rows.push({
      left: Array.from({ length: leftCount }).map(() => null),
      right: Array.from({ length: rightCount }).map(() => null),
      isRear: false,
    });
  }
  return rows;
}

/**
 * For special capacities return map of reservedSeatNumber -> target position.
 * position format: { rowIndex, side: "left" | "right", index }
 *
 * We'll place reserved seats at the back (lowest rowIndex = rowsCount-1),
 * and for vertical stacks we go upwards (rowsCount-2, rowsCount-3, ...)
 *
 * This implements your rules:
 * - 25: seat 13 -> lastRow.left[0]
 * - 26: seat 13 -> lastRow.left[0], seat 14 -> secondLast.left[0]
 * - 30: seats 13,14,15 -> lastRow.left[0], secondLast.left[0], thirdLast.left[0]
 * - 44: seats 21,22 -> lastRow.left[0], lastRow.left[1] (side-by-side),
 *        seats 23,24 -> secondLast.left[0], secondLast.left[1]
 */
function getReservedPositionsForCapacity(
  capacity: number,
  pattern: Pattern,
  rowsCount: number
): Record<number, { row: number; side: "left" | "right"; idx: number }> {
  const map: Record<number, { row: number; side: "left" | "right"; idx: number }> =
    {};

  // helper bottom-up
  const last = (offset: number) => rowsCount - 1 - offset;

  if (capacity === 25 && pattern === "1+2") {
    // seat 13 at last row, left[0]
    map[13] = { row: last(0), side: "left", idx: 0 };
  } else if (capacity === 26 && pattern === "1+2") {
    // 13 -> last.left[0], 14 -> secondLast.left[0]
    map[13] = { row: last(0), side: "left", idx: 0 };
    map[14] = { row: last(1), side: "left", idx: 0 };
  } else if (capacity === 30 && pattern === "1+2") {
    // 13-> last, 14-> secondLast, 15-> thirdLast (all left[0])
    map[13] = { row: last(0), side: "left", idx: 0 };
    map[14] = { row: last(1), side: "left", idx: 0 };
    map[15] = { row: last(2), side: "left", idx: 0 };
  } else if (capacity === 44 && pattern === "2+2") {
    // 21,22 side-by-side in last row left[0], left[1]
    map[21] = { row: last(0), side: "left", idx: 0 };
    map[22] = { row: last(0), side: "left", idx: 1 };
    // 23,24 in secondLast left[0], left[1]
    map[23] = { row: last(1), side: "left", idx: 0 };
    map[24] = { row: last(1), side: "left", idx: 1 };
  }

  return map;
}

/**
 * Main generator:
 * 1. Decide pattern (from config or fallback)
 * 2. seatsPerRow = pattern === "1+2" ? 3 : 4
 * 3. Compute rowsCount = ceil(totalSeats / seatsPerRow)
 * 4. Build empty rows structure
 * 5. Compute reserved map for capacity (special positions)
 * 6. Create number pool = [1..totalSeats], remove reservedNumbers
 * 7. Fill rows front-to-back, left then right, but if position is reserved assign reserved number, else pop next from pool
 */
function generateBusLayout(totalSeats: number): BusLayout {
  const config = BUS_CONFIG[totalSeats];
  const pattern: Pattern =
    config?.pattern ?? (totalSeats <= 30 ? "1+2" : "2+2");

  const seatsPerRow = pattern === "1+2" ? 3 : 4;
  const rowsCount = Math.ceil(totalSeats / seatsPerRow);

  // build empty rows
  const rows = buildEmptyRows(pattern, rowsCount);

  // reserved positions per your rules
  const reservedMap = getReservedPositionsForCapacity(
    totalSeats,
    pattern,
    rowsCount
  );

  // reserved numbers list
  const reservedNumbers = Object.keys(reservedMap).map((s) => Number(s));

  // numbers to assign to non-reserved positions (1..totalSeats) excluding reserved ones
  const numberPool: number[] = [];
  for (let n = 1; n <= totalSeats; n++) {
    if (!reservedNumbers.includes(n)) numberPool.push(n);
  }

  // helper to assign number into rows structure
  const assignNumber = (rowIdx: number, side: "left" | "right", idx: number, num: number) => {
    const seat = makeSeat(num);
    if (side === "left") rows[rowIdx].left[idx] = seat;
    else rows[rowIdx].right[idx] = seat;
  };

  // first, place reserved numbers into their positions (if any)
  for (const rn of reservedNumbers) {
    const pos = reservedMap[rn];
    if (!pos) continue;
    // sanity check: index exists
    const targetRow = rows[pos.row];
    if (!targetRow) {
      // if row doesn't exist (shouldn't happen), skip
      continue;
    }
    const sideLen = pos.side === "left" ? targetRow.left.length : targetRow.right.length;
    if (pos.idx >= sideLen) {
      // invalid idx for pattern; skip
      continue;
    }
    assignNumber(pos.row, pos.side, pos.idx, rn);
  }

  // now fill remaining positions front-to-back
  let poolIndex = 0;
  for (let r = 0; r < rowsCount; r++) {
    // left side positions
    for (let i = 0; i < rows[r].left.length; i++) {
      if (rows[r].left[i] === null) {
        // take next number from pool
        const num = numberPool[poolIndex++];
        if (num !== undefined) assignNumber(r, "left", i, num);
        else rows[r].left[i] = null;
      }
    }
    // right side positions
    for (let i = 0; i < rows[r].right.length; i++) {
      if (rows[r].right[i] === null) {
        const num = numberPool[poolIndex++];
        if (num !== undefined) assignNumber(r, "right", i, num);
        else rows[r].right[i] = null;
      }
    }
  }

  // mark last row as rear (for styling if needed)
  if (rows.length > 0) rows[rows.length - 1].isRear = true;

  return { rows };
}

/** UI helpers */
function getSeatSizeByRow(totalSeatsInRow: number): string {
  if (totalSeatsInRow >= 5) return "aspect-square w-6 text-[10px]";
  if (totalSeatsInRow === 4) return "aspect-square w-8 text-xs";
  if (totalSeatsInRow === 3) return "aspect-square w-9 text-sm";
  return "aspect-square w-10 text-sm";
}

/** Seat visual */
function SeatItem({
  seat,
  sizeClass,
  selected,
  onClick,
}: {
  seat: Seat;
  sizeClass: string;
  selected?: boolean;
  onClick?: (s: Seat) => void;
}) {
  const base =
    "rounded-lg flex items-center justify-center font-semibold border shadow-sm transition-all duration-150 select-none";

  const stateClass =
    seat.status === "available"
      ? "bg-green-100 border-green-400 hover:-translate-y-0.5 hover:shadow cursor-pointer"
      : seat.status === "booked"
      ? "bg-red-100 border-red-400 cursor-not-allowed opacity-90 line-through"
      : "bg-gray-100 border-slate-300 opacity-60 pointer-events-none";

  const selectedClass = selected ? "ring-2 ring-indigo-500 ring-offset-1" : "";

  return (
    <button
      type="button"
      onClick={() => seat.status === "available" && onClick?.(seat)}
      className={`${base} ${sizeClass} ${stateClass} ${selectedClass}`}
      title={`seat ${seat.number} - ${seat.status}`}
    >
      {seat.number}
    </button>
  );
}

/** Placeholder */
function Placeholder({ sizeClass }: { sizeClass: string }) {
  return <div className={`${sizeClass} opacity-0`} />;
}

/** MAIN component */
export default function BusSeatMap({
  capacity = 25,
  containerMaxWidth = "max-w-[360px]",
}: {
  capacity?: number | string;
  containerMaxWidth?: string;
}) {
  // normalize and validation (hooks below)
  const normalizedCapacity = Number(capacity);
  const isValid = !Number.isNaN(normalizedCapacity) && normalizedCapacity > 0;

  // hooks must always run
  const layout = useMemo(() => {
    if (!isValid) return { rows: [] };
    return generateBusLayout(normalizedCapacity);
  }, [normalizedCapacity, isValid]);

  const [selected, setSelected] = useState<Record<number, boolean>>({});

  function toggleSeat(s: Seat) {
    setSelected((prev) => {
      const clone = { ...prev };
      if (clone[s.number]) delete clone[s.number];
      else clone[s.number] = true;
      return clone;
    });
  }

  if (!isValid) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md">
        Invalid capacity: {String(capacity)}
      </div>
    );
  }

  return (
    <div className={`w-full ${containerMaxWidth} mx-auto p-4`}>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
        <div className="mb-3 text-center text-xs text-slate-500">Front →</div>

        <div className="space-y-2">
          {layout.rows.map((row, rIdx) => {
            const seatsInRow =
              (row.left?.length ?? 0) + (row.right?.length ?? 0);
            const sizeClass = getSeatSizeByRow(seatsInRow || 1);

            return (
              <div
                key={rIdx}
                className={`flex items-center justify-between ${row.isRear ? "" : ""}`}
              >
                {/* left */}
                <div className="flex gap-2">
                  {(row.left ?? []).map((s, i) =>
                    s ? (
                      <SeatItem
                        key={s.id}
                        seat={s}
                        sizeClass={sizeClass}
                        selected={!!selected[s.number]}
                        onClick={toggleSeat}
                      />
                    ) : (
                      <Placeholder key={`l-${i}`} sizeClass={sizeClass} />
                    )
                  )}
                </div>

                {/* aisle */}
                <div className="w-6 shrink-0" />

                {/* right */}
                <div className="flex gap-2">
                  {(row.right ?? []).map((s, i) =>
                    s ? (
                      <SeatItem
                        key={s.id}
                        seat={s}
                        sizeClass={sizeClass}
                        selected={!!selected[s.number]}
                        onClick={toggleSeat}
                      />
                    ) : (
                      <Placeholder key={`r-${i}`} sizeClass={sizeClass} />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 text-center text-xs text-slate-500">← Rear</div>
      </div>
    </div>
  );
}
