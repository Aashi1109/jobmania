import { POPUP_VISIBLE_TIME } from "@/constants";
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
      const popupId = Date.now();
      const sameTextPopup = state.popups.find(
        (popup) =>
          popup.message === action.payload.message &&
          popupId - popup.id < POPUP_VISIBLE_TIME
      );

      if (sameTextPopup) {
        return state;
      }
      return {
        ...state,
        count: state.count + 1,
        prevPopupTime: Date.now(),
        showPopup: true,
        popups: [...state.popups, { ...action.payload, id: popupId }],
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
