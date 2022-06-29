export interface FormState {
  activeDropdown: string;
  sortingAlgorithm: SortingAlgorithm;
  mazeGeneration: MazeGenerationAlgorithm;
  speed: Speed;
}

export enum SortingAlgorithm {
  DFS,
  A_STAR,
  DIJKSTRA,
  BFS,
  GREEDY_BEST_FIRST,
  BIDIRECTIONAL_BFS,
}

export enum MazeGenerationAlgorithm {
  CUSTOM,
  KRUSKAL,
  PRIMS,
  RECURSIVE_DIVISION,
  WILSON,
  RANDOMIZED_DFS,
  ALDOUS_BRODER,
}

export enum Speed {
  SLOW,
  NORMAL,
  FAST,
}

export const initialState: FormState = {
  activeDropdown: 'test',
  sortingAlgorithm: SortingAlgorithm.DFS,
  mazeGeneration: MazeGenerationAlgorithm.RANDOMIZED_DFS,
  speed: Speed.NORMAL,
};
