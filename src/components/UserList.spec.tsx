import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import taskContext from '../context/TaskContext';
import UserList from './UserList';

import { fakeData } from '../../utils/fakeData';
import { ToDo } from '../@types/navigation';

const fakeNavigation = {
  navigate: jest.fn(),
};

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
      <UserList navigation={fakeNavigation} /> as any
    </NativeBaseProvider>
  </taskContext.Provider>
);

describe('UserList', () => {
  beforeEach(cleanup);

  it('should render Component and show a text', async () => {
    render(componentRender());

    expect(screen.getByText('My Task List')).toBeTruthy();
  });

  it('should check if the function AddItem is call with myForm', () => {
    render(componentRender());

    const fab = screen.getByTestId('fab');

    fireEvent.press(fab);

    expect(fakeNavigation.navigate).toBeCalledWith('myForm');
  });
  it('should check if the updateTaskCheck function is call when clicked in Checkbox option', () => {
    render(componentRender());

    // Icon de Delete na lista de tarefas
    const updateTask = screen.getAllByTestId('updateTask')[1];
    fireEvent.press(updateTask);

    expect(updateTaskCheck).toHaveBeenCalledTimes(1);
  });
  it('should check if the updateTaskCheck function is call when clicked in Text option', () => {
    render(componentRender());

    // Icon de Delete na lista de tarefas
    const updateTextTask = screen.getByText('Go to work');
    fireEvent.press(updateTextTask);

    expect(updateTaskCheck).toHaveBeenCalledTimes(2);
  });
});

describe('FlatList and Actions', () => {
  beforeEach(cleanup);

  it('should check if the data are render in flatlist', async () => {
    render(componentRender());
    // Aguarde a finalização da renderização
    await waitFor(() => {
      // Verifique se o texto 'Go to work' está presente na árvore de componentes renderizados
      expect(screen.getAllByText('Go to work')).toBeTruthy();
    });
  });

  it('should check if the function confirmDelete is call and Alert is showing', () => {
    // simula um Alert
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    render(componentRender());
    // Icon de Delete na lista de tarefas
    const deletTask = screen.getAllByTestId('deletTask')[1];
    fireEvent.press(deletTask);
    // Verifica se a função Alert.alert foi chamada corretamente
    expect(Alert.alert).toHaveBeenCalledTimes(1);
    // Verifica se a função Alert.alert foi chamada com estas informações
    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete',
      `Are you sure you want to delete this task?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: expect.any(Function) },
      ]
    );
  });

  it('should check if the Alert features are corect', () => {
    render(componentRender());

    // simula um Alert com os dados do nosso Alert
    jest
      .spyOn(Alert, 'alert')
      .mockImplementation((title, message, callbackOrButtons) =>
        callbackOrButtons[1].onPress()
      );

    // Icon de Delete na lista de tarefas
    const deletTask = screen.getAllByTestId('deletTask')[1];
    fireEvent.press(deletTask);

    expect(removeTask).toHaveBeenCalledTimes(1);
  });
});
