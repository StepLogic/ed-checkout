import { useContext } from "react";
import AuthContext from "../context/Authcontext";

const useMyContext = () => {
  return useContext(AuthContext);
};

export default useMyContext;
