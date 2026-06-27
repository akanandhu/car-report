export type CarStatusI = string;

export type CarRowI = {
  id: string;
  evalId: string;
  vehicle: string;
  type: string;
  date: string;
  evaluator: string;
  status: CarStatusI;
};
