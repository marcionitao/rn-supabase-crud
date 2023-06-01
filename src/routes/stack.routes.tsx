import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import myForm from '../screens/myForm';
import myHome from '../screens/myHome';

// create a new stack navigator
const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  // passando parametros para o navigator
  const navigation = useNavigation();

  return (
    <Navigator initialRouteName='myHome'>
      <Screen
        name='myHome'
        options={{
          title: 'My Task List',
          headerShown: false,
          headerTitleAlign: 'left',
          headerStyle: { backgroundColor: 'white' },
        }}
        component={myHome}
      />
      <Screen
        name='myForm'
        options={{
          title: 'Task ',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'white' },
        }}
        component={myForm}
      />
    </Navigator>
  );
}
