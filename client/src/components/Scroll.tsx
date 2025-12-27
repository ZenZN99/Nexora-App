import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scroll = () => {
    const {location}: any = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    },[location]);
  return null;
}

export default Scroll
