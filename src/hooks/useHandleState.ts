import { useState } from "react";

export const useHandleState = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  return [state, setState] as const;
};
