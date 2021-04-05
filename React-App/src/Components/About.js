import React from "react";
import Navbar from "./NavbarComponent";
import {useHistory } from "react-router-dom"
import { useAuth } from "../Context/AuthContext";
import {MdKeyboardArrowLeft} from "react-icons/md"
function About() {
  const { currentUser } = useAuth();
  const history = useHistory();
  return (
    <div className="h-full">
      <Navbar displayEvery={true} />
      <div className="flex flex-row justify-start items-start rounded p-2 md:p-4">
        <div className="w-full">
          <div className="mt-16">
          {currentUser ? <button className=" py-1 px-2 bg-blue-200 rounded " onClick={()=> {history.goBack()}}><MdKeyboardArrowLeft className="inline text-xl"/> Go back</button> : null}
          <h2 className="text-2xl md:text-3xl lg:text-4xl ">About</h2>
          <div className=" md:w-4/6 lg:w-3/6 flex flex-col items-start">
            <div className="border rounded p-4 my-4 text-lg">
              <h3 className="text-xl md:text-2xl">About Me</h3>
              <p> My name is Tushar and i'm a second year student at VIT. I have a keen interest in web developement and i'm hard at work to achieve my goals. 
             </p>
             <p>But yeh.. I'm not always smashing my keyboard through the day, so i play guitar and Synthesizer. And when ever I could go out with my friends, we play gully Cricket, when i can't, I play Apex Legends. That how i like to spend my day </p>

            </div>
            <div className="border p-4 my-4 rounded text-lg ">
              <h3 className="text-xl md:text-2xl">About the Project</h3>
              <p>The prime reason to build the site was to see what I learnt after completing the raect course(Finally). I also wanted to use firebase, so here it is, Presenting you Tasker, the app build with react and Firebase to manage your different Todos for your project.</p>
            </div>
            <div className="border p-4 my-4 rounded text-lg w-full ">
              <h3 className="text-xl md:text-2xl">Technologies Used</h3> 
    <ul>
      <li className="my-2"><span className="italic mx-2 bg-green-200 py-1 px-2 rounded">React</span><span className="text-sm md:text-base">for Frontend</span></li>
      <li className="my-2"><span className="italic mx-2 bg-red-200 py-1 px-2 rounded">Tailwind</span><span className="text-sm md:text-base">for css</span></li>
      <li className="my-2"><span className="italic mx-2 bg-blue-200 py-1 px-2 rounded">Netlify</span><span className="text-sm md:text-base">for hosting</span></li>
    
    <li className="my-2"><span className="italic mx-2 bg-yellow-200 py-1 px-2 rounded">Firebase</span><span className="text-sm md:text-base">for Authentication and Storage</span></li>
    </ul>
            </div>

          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
