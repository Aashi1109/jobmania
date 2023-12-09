import { IPopup } from "@/definitions/interfaces";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

type PopupAction =
  | { type: "CREATE_POPUP"; payload: IPopup["popups"][0] }
  | { type: "RESET_POPUP" };

const popupInitialState: IPopup = {
  showPopup: false,
  count: 0,
  popups: [],
};

const PopupContext = createContext<
  | {
      state: IPopup;
      dispatch: React.Dispatch<PopupAction>;
    }
  | undefined
>(undefined);

const popupReducer = (state: IPopup, action: PopupAction): IPopup => {
  switch (action.type) {
    case "CREATE_POPUP":
      const diff = Date.now() - (state.prevPopupTime || 0);
      if (state.count > 5 && diff > 5000) {
        return {
          ...state,
          popups: [],
          count: 0,
        };
      }
      return {
        ...state,
        count: state.count + 1,
        prevPopupTime: Date.now(),
        showPopup: true,
        popups: [...state.popups, { ...action.payload, id: Date.now() }],
      };
    case "RESET_POPUP":
      return popupInitialState;
    default:
      return state;
  }
};

const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(popupReducer, popupInitialState);

  return (
    <PopupContext.Provider value={{ state, dispatch }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

export default PopupProvider;
