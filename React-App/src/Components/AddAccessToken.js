import { useState } from "react";
import { MdAdd } from "react-icons/md";
function AddAccessToken({addAccessToken}) {
  const [showInput, toggleInput] = useState(false);
  const [tokenInput, updateInput] = useState("");

  const handleChange = (event) => {
    updateInput(event.target.value);
  };
  const toggle = (event) => {
    event.preventDefault();
    toggleInput(!showInput);
  };
  const submitToken = async (event) => {
      event.preventDefault();
    const result=  await addAccessToken(tokenInput);
    console.log(result);
  }
  return (
    <div className="w-52 md:w-60">
      {showInput ? (
        <div className="flex flex-col justify-center md-4 md:mx-8">
          <input
            type="text"
            value={tokenInput}
            className="py-1 px-2 rounded"
            onChange={handleChange}
          />
          <div className="flex flex-row justify-between">
            <button className="bg-green-200 text-green-700 border-green-600 border-2 my-2 px-2 rounded" onClick={submitToken}>
              Add
            </button>
            <button
              onClick={toggle}
              className="bg-yellow-200 text-yellow-700 border-yellow-600 border-2 my-2 px-2 rounded"
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
