import { renderHook } from '@testing-library/react-hooks';
import React, { useContext } from 'react';

import * as API from '../context/TaskContext';
import { ItemContext, ItemProvider } from '../context/TaskContext';

import { act, cleanup, render, screen } from '@testing-library/react-native';
import { Button, Text, View } from 'react-native';
import { fakeData } from '../../utils/fakeData';
import { ToDo } from '../@types/navigation';

const addTask = jest.fn();
const removeTask = jest.fn();
const updateTaskCheck = jest.fn();

describe('TaskContext Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const TestComponent = () => {
    const { task } = useContext(ItemContext);

    const handleNewTask = () => {
      const newTask = {
        id: '5',
        description: 'New Task',
        completed: false,
        created_at: '2018-11-11T08:00:00.000Z',
      };
      addTask(newTask);
    };

    return (
      <View>
        <Text testID='description'>{task[0]?.description}</Text>
        <Text testID='created_at'>{task[0]?.created_at}</Text>
        <Button title='Add' testID='new_task_button' onPress={handleNewTask} />
      </View>
    );
  };

  it('proper data is sent to the component', async () => {
    render(
      <ItemContext.Provider
        value={{
          task: fakeData.tasks as unknown as ToDo[],
          addTask,
          removeTask,
          updateTaskCheck,
        }}
      >
        <TestComponent />
      </ItemContext.Provider>
    );
    const description = screen.getByTestId('description');
    const created_at = screen.getByTestId('created_at');

    expect(description.props.children).toBe('Go to work');
    expect(created_at.props.children).toBe('2018-11-11T08:00:00.000Z');
  });

  it('should check if getItems is call and return all datas', async () => {
    // Mockando a função getItems para retornar os itens falsos
    jest.spyOn(API, 'getItems').mockResolvedValue(fakeData);

    const wrapper = ({ children }) => (
      <ItemContext.Provider
        value={{ task: fakeData.tasks, addTask, removeTask, updateTaskCheck }}
      >
        {children}
      </ItemContext.Provider>
    );

    const { result } = renderHook(() => useContext(ItemContext), { wrapper });
    expect(result.current.task).toEqual(fakeData.tasks);
  });
  it('should add a new task and check if it was successfully', async () => {
    const wrapper = ({ children }) => <ItemProvider>{children}</ItemProvider>;

    const { result } = renderHook(() => useContext(ItemContext), { wrapper });

    act(() => {
      const newTask = {
        id: '',
        description: 'New Task',
        completed: false,
        created_at: '2018-11-11T08:00:00.000Z',
      };
      result.current.addTask(newTask);
    });

    act(() => {
      const newTask2 = {
        id: '',
        description: 'New Task 2',
        completed: false,
        created_at: '2018-11-11T08:00:00.000Z',
      };
      result.current.addTask(newTask2);
    });

    expect(result.current.task).toHaveLength(2);
  });

  it('should not add a new task', async () => {
    const wrapper = ({ children }) => <ItemProvider>{children}</ItemProvider>;

    const { result } = renderHook(() => useContext(ItemContext), { wrapper });

    const addTaskMock = jest.fn(() => false);

    // Substitui a implementação da função addTask pelo mock
    result.current.addTask = addTaskMock;

    const newTask = {
      id: '',
      description: 'New Task',
      completed: false,
      created_at: '2018-11-11T08:00:00.000Z',
    };

    act(() => {
      result.current.addTask(newTask);
    });

    expect(result.current.task).toHaveLength(0);
    expect(result.current.task).not.toEqual(expect.arrayContaining([newTask]));
    expect(result.current.addTask).toHaveBeenCalledTimes(1);
  });

  it('should add a new task and update the task list correctly ', async () => {
    const wrapper = ({ children }) => <ItemProvider>{children}</ItemProvider>;

    const { result } = renderHook(() => useContext(ItemContext), { wrapper });

    act(() => {
      const newTask = {
        id: '',
        created_at: '2018-11-11T08:00:00.000Z',
        description: 'Go to work',
        completed: false,
      };
      result.current.addTask(newTask);
    });

    const index = 0;

    act(() => {
      result.current.updateTaskCheck(index);
    });

    const expectedTasks = [
      {
        id: result.current.task[0].id,
        created_at: '2018-11-11T08:00:00.000Z',
        description: 'Go to work',
        completed: true,
      },
    ];

    expect(result.current.task).toEqual(expect.arrayContaining(expectedTasks));
  });

  it('should add a new task and remover the task of list correctly ', async () => {
    const wrapper = ({ children }) => <ItemProvider>{children}</ItemProvider>;

    const { result } = renderHook(() => useContext(ItemContext), { wrapper });

    act(() => {
      const newTask = {
        id: '',
        created_at: '2018-11-11T08:00:00.000Z',
        description: 'Go to work',
        completed: false,
      };
      result.current.addTask(newTask);
    });

    const taskId = result.current.task[0].id;

    expect(result.current.task).toHaveLength(1);
    expect(result.current.task[0].id).toBe(taskId);

    await act(async () => {
      await result.current.removeTask(result.current.task[0].id);
    });

    expect(result.current.task).toHaveLength(0);
  });
});
