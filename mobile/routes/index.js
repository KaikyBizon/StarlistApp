import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./Stack.Routes";

export default function Routes() {
    return (
        // Este componente define a configuração de navegação do aplicativo.
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    );
}
