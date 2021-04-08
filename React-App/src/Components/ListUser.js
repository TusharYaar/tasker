import {useState} from 'react'

function ListUser({uid, deleteUser}) {
    const [showDelete,toggleDelete] = useState(false);
    return (
        <div className="flex flex-col md:flex-row flex-wrap py-2 px-4 my-2 justify-between md:items-center border-blue-600 w-full rounded bg-blue-200"> 
        <span className="my-2 font-bold">user ID:{uid}</span> 
        {showDelete ? <div className="text-xl">Sure? <button className="text-lg bg-red-200 border-red-600 text-red-700 border-2 px-4 py-2 rounded mx-4" onClick={() => {deleteUser(uid)}}>Yes</button><button className="text-lg bg-green-200 border-green-600 text-green-700 border-2 px-4 py-2 rounded" onClick={() => {toggleDelete(!showDelete);}}>No</button> </div> : 
        <button className="text-lg bg-red-200 border-red-600 text-red-700 border-2 px-4 py-2 rounded" onClick={() => {toggleDelete(!showDelete);}} >Remove</button>           }
    
        </div>
    )
}

export default ListUser;
