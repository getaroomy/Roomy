import { useState, useEffect } from "react";
import {Navbar} from "./navbar";
import { Sidebar } from "./sidebar";
import { UserAuth } from "@/app/context/AuthContext";

const Navigation = () => {
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const {logOut, user, loading} = UserAuth();

  useEffect(()=>{
    if(user && !loading) setShowNavigation(true);
    if(!user && !loading) setShowNavigation(false);
  }, [user,loading]);
  
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    showNavigation && <> 
      <Sidebar isOpen={isOpen} toggle={toggle} logOut={logOut} uid={user?.uid} />
      <Navbar toggle={toggle} logOut={logOut} uid={user?.uid} />
    </>
  );
};

export default Navigation;