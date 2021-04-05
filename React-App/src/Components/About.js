import React from "react";
import Navbar from "./NavbarComponent";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiGithubFill,RiTwitterLine,RiInstagramLine,RiUser3Line,RiLinkedinBoxLine } from "react-icons/ri";
function About() {
  const { currentUser } = useAuth();
  const history = useHistory();
  return (
    <div className="h-full">
      <Navbar displayEvery={true} />
      <div className="flex flex-row justify-start items-start rounded p-2 md:p-4">
        <div className="w-full">
          <div className="mt-16">
            {currentUser ? (
              <button
                className=" py-1 px-2 bg-blue-200 rounded "
                onClick={() => {
                  history.goBack();
                }}
              >
                <MdKeyboardArrowLeft className="inline text-xl" /> Go back
              </button>
            ) : null}
            <h2 className="text-2xl md:text-3xl lg:text-4xl ">About</h2>
            <div className=" md:w-4/6 lg:w-3/6 flex flex-col items-start">
              <div className="border rounded p-4 my-4 text-lg">
                <h3 className="text-xl md:text-2xl">About Me</h3>
                <p>
                  {" "}
                  My name is Tushar and i'm a second year student at VIT. I have
                  a keen interest in web developement and i'm hard at work to
                  achieve my goals.
                </p>
                <p>
                  But yeh.. I'm not always smashing my keyboard through the day,
                  so i play guitar and Synthesizer. And when ever I could go out
                  with my friends, we play gully Cricket, when i can't, I play
                  Apex Legends. That how i like to spend my day{" "}
                </p>
              </div>
              <div className="border rounded p-4 my-4 text-lg w-full">
                <h3 className="text-xl md:text-2xl">Connect With Me</h3>
                <ul className="flex flex-row items-start my-2">
                  <a href="https://tusharyaar.netlify.app/" rel="noreferrer noopener">
                    <li className="px-2 py-1 rounded bg-yellow-300 my-2 shadow-lg italic ">
                      <RiUser3Line className="text-3xl mr-1 inline" /> Portfolio
                    </li>
                  </a>
                  <a href="https://www.instagram.com/tushar_yaar/" rel="noreferrer noopener" className="mx-3">
                    <li className="px-2 py-1 rounded bg-pink-300 my-2 shadow-lg italic ">
                      <RiInstagramLine className="text-3xl mr-1 inline" /> Instagram
                    </li>
                  </a>
                  <a href="https://twitter.com/tushar_yaar" rel="noreferrer noopener" className="mr-3">
                    <li className="px-2 py-1 rounded bg-blue-300 my-2 shadow-lg italic ">
                      <RiTwitterLine className="text-3xl mr-1 inline" /> Twitter
                    </li>
                  </a>
                  <a href="https://www.linkedin.com/in/tushar-s-agrawal-215ba81a0/" rel="noreferrer noopener" className="mr-3">
                    <li className="px-2 py-1 rounded bg-indigo-300 my-2 shadow-lg italic ">
                      <RiLinkedinBoxLine className="text-3xl mr-1 inline" /> LinkedIn
                    </li>
                  </a>
                  {/* <a href="#" rel="noreferrer noopener">
                    <li className="px-2 py-1 rounded bg-gray-200 my-2 shadow-lg ">
                      <RiGithubFill className="text-3xl mr-1 inline" /> Github
                    </li>
                  </a> */}
                  
              
                </ul>
              </div>
              <div className="border p-4 my-4 rounded text-lg ">
                <h3 className="text-xl md:text-2xl">About the Project</h3>
                <p>
                  The prime reason to build the site was to see what I learnt
                  after completing the raect course(Finally). I also wanted to
                  use firebase, so here it is, Presenting you Tasker, the app
                  build with react and Firebase to manage your different Todos
                  for your project.
                </p>
              </div>
              <div className="border p-4 my-4 rounded text-lg w-full ">
                <h3 className="text-xl md:text-2xl">Technologies Used</h3>
                <ul>
                  <li className="my-2">
                    <span className="italic mx-2 bg-green-200 py-1 px-2 rounded">
                      React
                    </span>
                    <span className="text-sm md:text-base">for Frontend</span>
                  </li>
                  <li className="my-2">
                    <span className="italic mx-2 bg-red-200 py-1 px-2 rounded">
                      Tailwind
                    </span>
                    <span className="text-sm md:text-base">for css</span>
                  </li>
                  <li className="my-2">
                    <span className="italic mx-2 bg-blue-200 py-1 px-2 rounded">
                      Netlify
                    </span>
                    <span className="text-sm md:text-base">for hosting</span>
                  </li>

                  <li className="my-2">
                    <span className="italic mx-2 bg-yellow-200 py-1 px-2 rounded">
                      Firebase
                    </span>
                    <span className="text-sm md:text-base">
                      for Authentication and Storage
                    </span>
                  </li>
                  <li className="my-2">
                    <a href="https://github.com/TusharYaar/tasker/tree/master/React-App" rel="noreferrer noopener">
                    <span className="italic mx-2 bg-gray-200 py-1 px-2 rounded">
                    <RiGithubFill className="text-3xl mr-1 inline" />  Github
                    </span>
                    <span className="text-sm md:text-base">
                      Find the code here
                    </span>
                    </a>
                  </li>
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
