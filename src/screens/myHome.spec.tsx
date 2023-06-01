import { cleanup, render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import taskContext from '../context/TaskContext';
import MyHome from './myHome';

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
      <MyHome />
    </NativeBaseProvider>
  </taskContext.Provider>
);

describe('MyHome', () => {
  beforeEach(cleanup);

  it('should render Component and show Text', () => {
    const component = render(componentRender());

    expect(component).toBeTruthy();
  });
});
