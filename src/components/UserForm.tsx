import { useNavigation } from '@react-navigation/native';
import { Box, Button, FormControl, VStack } from 'native-base';

import { TextInput } from 'react-native';

import { en, registerTranslation } from 'react-native-paper-dates';

import { useContext, useState } from 'react';
import { DatePickerInput } from 'react-native-paper-dates';
import { ToDo, ToDoContextType } from '../@types/navigation';
import taskContext from '../context/TaskContext';

registerTranslation('EN', en);

export default function UserForm() {
  const { addTask } = useContext(taskContext) as ToDoContextType;
  // call routes and passing values
  const navigation = useNavigation();

  const initialState = {
    id: '',
    description: '',
    created_at: '',
    completed: false,
  };
  //
  const [formData, setFormData] = useState<ToDo | null>(initialState);
  const [inputDate, setInputDate] = useState(new Date());

  const onSubmit = () => {
    // add new task
    addTask(formData);
    // navigate to home screen
    navigation.goBack();
  };

  return (
    <Box p='4' safeArea flex={1}>
      <VStack width='100%' maxW='400px'>
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              bold: true,
            }}
            mt='2'
          >
            Task
          </FormControl.Label>
          <TextInput
            placeholder='Task description'
            onChangeText={(value) =>
              setFormData({ ...formData, description: value })
            }
            value={formData.description}
          />

          <FormControl.Label
            _text={{
              bold: true,
            }}
            mt='5'
          >
            Date
          </FormControl.Label>
          <DatePickerInput
            testID='taskInput'
            locale='EN'
            label='Task'
            value={inputDate}
            onChange={(value) => {
              setInputDate(value);
              setFormData({
                ...formData,
                created_at: value.toUTCString(),
              });
            }}
            inputMode='start'
          />
        </FormControl>

        <Button
          onPress={onSubmit}
          bg='green.700'
          mt='8'
          colorScheme='green.900'
        >
          Save
        </Button>
      </VStack>
    </Box>
  );
}
