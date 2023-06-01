//import { To } from '@react-navigation/native/lib/typescript/src/useLinkTo';

export type ToDo = {
  id: string;
  created_at: string;
  description: string;
  completed: boolean;
};

export type ToDoContextType = {
  task: ToDo[];
  addTask: (newTask: ToDo) => void;
  removeTask: (taskId: string) => void;
  updateTaskCheck: (index: number) => void;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      myHome: undefined;
      myForm: ToDo;
    }
  }
}
