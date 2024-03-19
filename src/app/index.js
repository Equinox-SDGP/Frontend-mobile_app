import { Redirect } from "expo-router";

const Index = () => {
	// This is used to redirect the user to the start page of the app
	return <Redirect href="/(auth)/startPage/startPage" />;
};
export default Index;