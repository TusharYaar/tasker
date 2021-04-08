import { useState } from "react";
import { MdAdd,MdClose } from "react-icons/md";
function AddAccessToken({addAccessToken}) {
  const [showInput, toggleInput] = useState(false);
  const [tokenInput, updateInput] = useState("");
  const [message, setMessage] = useState({message:"",type:"error"});
  const [isLoading, toggleLoading] = useState(false);
  const handleChange = (event) => {
    updateInput(event.target.value);
  };
  const toggle = (event) => {
    event.preventDefault();
    toggleInput(!showInput);
  };
  const submitToken = async (event) => {
      if(tokenInput.length< 6 || tokenInput.length > 10) {
        setMessage({message: "Access code must be between 6 and 10 letters",type:"error"});
      return;
      }
      toggleLoading(true);
      event.preventDefault();
    const result=  await addAccessToken(tokenInput);
    setMessage(result);
    toggleLoading(false);

  }
  return (
    <div className="w-52 md:w-60">
      {showInput ? (
        <div className="flex flex-col justify-center md-4 md:mx-8">
          {message.message.length > 0 && (
        <div className={`flex flex-row justify-between ${message.type ==="error" ?  "text-red-600 bg-red-200" : "text-green-600 bg-green-200"} my-2 px-2 py-1 text-sm rounded`}>
          {message.message}{" "}
          <button
            onClick={() => {
              setMessage({message:"",type:"error"});
            }}
          >
            <MdClose />
          </button>
        </div>
      )}
          <input
            type="text"
            value={tokenInput}
            className="py-1 px-2 rounded"
            onChange={handleChange}
          />
          <div className="flex flex-row justify-between">
          
            <button className={`bg-green-200 text-green-700 border-green-600 border-2 my-2 px-2 rounded ${ isLoading ? "cursor-not-allowed opacity-50" : ""}`} onClick={submitToken}>
              Add
            </button>
            <button
              onClick={toggle}
              className={`bg-yellow-200 text-yellow-700 border-yellow-600 border-2 my-2 px-2 rounded ${ isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-white my-2 mb-4 py-2 px-4 rounded"
          onClick={toggle}
        >
          {" "}
          <MdAdd className="inline mx-2" />
          Add Access Token
        </button>
      )}
    </div>
  );
}

export default AddAccessToken;
