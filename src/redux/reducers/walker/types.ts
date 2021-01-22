export interface Walker {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  cellphone?: number;
  adress?: string;
  zona?: string;
  dni?: number;
  photo?: string;
  role?: string;
  CUIT?: string;
  workZone?: string;
  workHours?: string;
}
export interface WalkerState {
  walkers: Walker[]
}

export const GET_WALKERS = 'GET_WALKERS';

interface GetWalkersAction {
  type: typeof GET_WALKERS;
  payload: Walker[]
}

export type WalkerActionsTypes = GetWalkersAction