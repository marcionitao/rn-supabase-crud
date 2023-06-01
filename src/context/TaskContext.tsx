/*create a context api*/
import React, { createContext, useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import sortByDate from '../../utils/sortByDate';
import { ToDo, ToDoContextType } from '../@types/navigation';

export const ItemContext = createContext<ToDoContextType>({
  task: [],
  addTask: () => {},
  removeTask: () => {},
  updateTaskCheck: () => {},
});

// get data from supabase
export const getItems = async (fakeData = null) => {
  if (fakeData) return fakeData;
  // istanbul ignore next
  let { data: Items } = await supabase.from('Items').select('*');

  return Items;
};

export function ItemProvider({ children }) {
  // state
  const [task, setTask] = useState<ToDo[]>([]);

  useEffect(() => {
    getItems()
      .then((items) => {
        setTask(sortByDate(items));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const generateId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const addTask = async (toDo: ToDo) => {
    const dateCondition =
      toDo.created_at === undefined
        ? new Date().toISOString()
        : toDo.created_at;

    const newTask = {
      id: generateId(),
      description: toDo.description,
      created_at: dateCondition,
      completed: false,
    };

    setTask(sortByDate([...task, newTask]));

    // istanbul ignore next
    const { error } = await supabase.from('Items').insert([
      {
        description: toDo.description,
        created_at: new Date(dateCondition),
        completed: false,
      },
    ]);
    // istanbul ignore next
    if (error) throw error;
  };

  const removeTask = async (id: string) => {
    // istanbul ignore next
    const { error } = await supabase.from('Items').delete().eq('id', id);

    setTask(sortByDate(task.filter((item) => item.id !== id)));
  };

  const updateTaskCheck = async (index: number) => {
    const newList: ToDo[] = [...task];
    // se a prop "completed"  estiver  como "verdadeira", ela será definida como "falsa" e vice-versa.
    newList[index].completed = !newList[index].completed;

    setTask(newList);

    // istanbul ignore next
    const { error } = await supabase
      .from('Items')
      .update({ completed: newList[index].completed })
      .eq('id', task[index].id);
    // istanbul ignore next
    if (error) throw error;
  };

  return (
    <ItemContext.Provider
      value={{
        task,
        addTask,
        removeTask,
        updateTaskCheck,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export default ItemContext;

export const myTask = () => React.useContext(ItemContext);
