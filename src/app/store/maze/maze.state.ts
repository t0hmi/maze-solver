export interface MazeState {
  pixelWidth: number;
  pixelHeight: number;
  isProcessing: boolean | null;
  isWallsSet: boolean | null; 
  startCoords: string;
  finishCoords: string;
}

export const initialState: MazeState = {
  pixelWidth: 0,
  pixelHeight: 0,
  isProcessing: null,
  isWallsSet: null,
  startCoords: '',
  finishCoords: '',
};
