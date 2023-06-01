import { NavigationContainer } from '@react-navigation/native';
import { Box } from 'native-base';
import { StackRoutes } from './stack.routes';

// Estas serão as rotas disponiveis para toda a aplicação
export function Routes() {
  return (
    /* Aqui definimos a nossa estrategia de navegação, que será utilizada pelo react-navigation. */
    <NavigationContainer>
    
        <StackRoutes />
      
    </NavigationContainer>
  );
}
