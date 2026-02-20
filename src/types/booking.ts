export type SeatStatus =
  | "Available"
  | "BookedForMale"
  | "BookedForFemale"
  | "Selected"
  | "Empty"
  | "SoldOut";

export interface Seat {
  id: number;
  number: number;
  status: SeatStatus;
}

export interface Passenger {
  seatId: number;
  seatNumber: number;
  firstName: string;
  lastName: string;
  nationalId: string;
  isForeigner: boolean;
  gender: "male" | "female" | null;
  birthDate: { day: string; month: string; year: string };
}