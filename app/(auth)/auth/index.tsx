import AuthScreen from "@/components/auth/AuthScreen";
import PopupProvider from "@/context/PopupContext";

const index = () => {
  return (
    <PopupProvider>
      <AuthScreen />
    </PopupProvider>
  );
};

export default index;
