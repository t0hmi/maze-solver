export interface FormState {
  activeDropdown: string;
  solvingAlgorithm: SolvingAlgorithm;
  mazeGeneration: MazeGenerationAlgorithm;
  speed: Speed;
}

export enum SolvingAlgorithm {
  DFS = 'DFS',
  A_STAR = 'A*',
  DIJKSTRA = 'Dijkstra',
  BFS = 'BFS',
  GREEDY_BEST_FIRST = 'Greedy best first',
  BIDIRECTIONAL_BFS = 'Bidirectional BFS',
}

export enum MazeGenerationAlgorithm {
  CUSTOM = 'Custom',
  KRUSKAL = 'Kruskal',
  PRIMS = 'Prims',
  RECURSIVE_DIVISION = 'Recursive Division',
  WILSON = 'Wilson',
  RANDOMIZED_DFS = 'Randomizd DFS',
  ALDOUS_BRODER = 'Aldous Broder',
}

export enum Speed {
  SLOW = 'Slow',
  NORMAL = 'Normal',
  FAST = 'Fast',
}

export const initialState: FormState = {
  activeDropdown: 'test',
  solvingAlgorithm: SolvingAlgorithm.DFS,
  mazeGeneration: MazeGenerationAlgorithm.RANDOMIZED_DFS,
  speed: Speed.NORMAL,
};
