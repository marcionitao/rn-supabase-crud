import { AntDesign, Ionicons } from '@expo/vector-icons';
import {
  Box,
  Checkbox,
  Divider,
  Fab,
  FlatList,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import taskContext from '../context/TaskContext';

type UserListProps = {
  navigation?: {
    navigate: (route: string) => void;
  };
};

export default function UserList({ navigation }: UserListProps) {
  // obtendo o context dos dados entre os componentes
  const { task, updateTaskCheck, removeTask } = useContext(taskContext);

  const addItem = () => {
    navigation.navigate('myForm');
  };

  const confirmDelete = (item: string) => {
    return Alert.alert('Delete', `Are you sure you want to delete this task?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => removeTask(item),
      },
    ]);
  };

  const getUserItem = ({ item, index }) => {
    return (
      <Box w='100%'>
        <VStack mt={5} space={6} alignItems='center'>
          <HStack
            w='100%'
            mt={2}
            justifyContent='space-between'
            alignItems='center'
            key={item.id}
          >
            <Checkbox
              isChecked={item.completed}
              onChange={() => updateTaskCheck(index)}
              value={item.description}
              accessibilityLabel='choose a option'
              colorScheme='green'
              testID='updateTask'
            />

            <Text
              width='100%'
              flexShrink={1}
              textAlign='left'
              mx='2'
              strikeThrough={item.completed}
              _light={{
                color: item.completed ? 'gray.400' : 'coolGray.800',
              }}
              _dark={{
                color: item.completed ? 'gray.400' : 'coolGray.50',
              }}
              onPress={() => updateTaskCheck(index)}
            >
              {item.description}
            </Text>

            <IconButton
              size='sm'
              colorScheme='trueGray'
              testID='deletTask'
              icon={
                <Icon
                  as={Ionicons}
                  name='trash-bin-outline'
                  size='sm'
                  color='red.500'
                />
              }
              onPress={() => confirmDelete(item)}
            />
          </HStack>
          <Divider />
        </VStack>
      </Box>
    );
  };

  return (
    <Box p='4' safeArea flex={1}>
      <Heading fontSize='xl' p='4' pb='3'>
        My Task List
      </Heading>
      <FlatList
        data={task}
        renderItem={getUserItem}
        keyExtractor={(item) => item.id}
      />

      <Fab
        testID='fab'
        renderInPortal={false}
        shadow={2}
        onPress={() => addItem()}
        colorScheme='green.900'
        bg='green.700'
        icon={<Icon color='white' as={AntDesign} name='plus' size='lg' />}
      />
    </Box>
  );
}
