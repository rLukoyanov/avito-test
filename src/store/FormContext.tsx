import { createContext, useContext, useReducer, useMemo } from "react";
import {
  AllFieldsOfAdvertisements,
  AllTypesOfAdvertisements,
} from "../types/api";
import { PartialBy } from "../types/utils";

export enum FormActions {
  updateField,
}

type Action = {
  type: FormActions;
  fieldName: AllFieldsOfAdvertisements;
  newValue: string;
};

type State = PartialBy<Omit<AllTypesOfAdvertisements, 'id'>, "type">;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case FormActions.updateField:
      return {
        ...state,
        [action.fieldName]: action.newValue,
      };
    default:
      throw new Error("Unknown action.");
  }
}

const initialState: State = {
  name: "",
  description: "",
  location: "",
};

const FormContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  isSecondStepDisabled: boolean;
} | null>(null);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isSecondStepDisabled = useMemo(() => {
    return !state.name || !state.description || !state.type || !state.location;
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch, isSecondStepDisabled }}>
      {children}
    </FormContext.Provider>
  );
};

export const useStepForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useStepForm must be used within a FormProvider");
  }
  return context;
};
