import { FormState } from './form';
import { MazeState } from './maze';

export interface State {
  form: FormState;
  maze: MazeState;
}
