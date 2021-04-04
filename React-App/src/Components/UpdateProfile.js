import React from 'react'

function UpdateProfile({sidebarVisible}) {
    return (
        <div className={`p-2 md:p-4 w-full mt-16 ${ sidebarVisible ? "ml-52" : "ml-0" }  transition-all duration-500 md:ml-60`}>
          <h2 className="text-4xl">Update Profile</h2>
        </div>
    )
}

export default UpdateProfile
