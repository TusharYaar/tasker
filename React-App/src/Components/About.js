import React from "react";
import Navbar from "./NavbarComponent";
import { useAuth } from "../Context/AuthContext";
function About() {
  const { currentUser } = useAuth();
  return (
    <div className="h-full">
      <Navbar displayEvery={true} />
      <div className="flex flex-row justify-start items-start rounded p-2 md:p-4">
        <div>
          <h2 className="text-4xl mt-16">About</h2>
        </div>
      </div>
    </div>
  );
}

export default About;
