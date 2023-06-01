import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import taskContext from '../context/TaskContext';
import UserForm from './UserForm';

import { fakeData } from '../../utils/fakeData';
import { ToDo } from '../@types/navigation';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const addTask = jest.fn();
const removeTask = jest.fn();
const updateTaskCheck = jest.fn();

const componentRender = () => (
  <taskContext.Provider
    value={{
      task: fakeData.tasks as unknown as ToDo[],
      addTask,
      removeTask,
      updateTaskCheck,
    }}
  >
    <NativeBaseProvider initialWindowMetrics={inset}>
      <UserForm />
    </NativeBaseProvider>
  </taskContext.Provider>
);

describe('UserForm', () => {
  beforeEach(cleanup);

  it('should render Component and show Text', () => {
    render(componentRender());

    expect(screen.getByText('Task')).toBeTruthy();
  });

  it('should check if Submit function is call', () => {
    render(componentRender());

    const button = screen.getByRole('button', { name: 'Save' });
    fireEvent.press(button);

    expect(addTask).toHaveBeenCalledTimes(1);
  });

  it('should check if is possible enter with the felds Text and Date in Input option', async () => {
    const formData = {
      description: 'nova tarefa',
      created_at: '07/05/2022',
    };

    const { getByPlaceholderText, getByTestId } = render(componentRender());
    const textInput = getByPlaceholderText('Task description');
    const dateInput = getByTestId('taskInput');

    fireEvent.changeText(textInput, formData.description);
    fireEvent.changeText(dateInput, formData.created_at);

    expect(textInput.props.value).toEqual('nova tarefa');
    expect(dateInput.props.value).toEqual('07/05/2022');
  });
});
