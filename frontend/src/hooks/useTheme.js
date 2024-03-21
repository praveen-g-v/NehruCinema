import { useContext } from "react";
import ThemeContext from "./Theme";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
