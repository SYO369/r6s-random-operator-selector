export enum Side {
  ATTACKER = 'ATTACKER',
  DEFENDER = 'DEFENDER'
}

export interface Operator {
  id: string;
  name: string;
  side: Side;
  role: string[]; // e.g., Hard Breach, Roamer
  speed: 1 | 2 | 3;
  health: 1 | 2 | 3;
  gadget: string;
  iconType: 'breach' | 'intel' | 'support' | 'shield' | 'trap' | 'entry';
}

export interface StrategyResponse {
  tip: string;
  map: string;
}
