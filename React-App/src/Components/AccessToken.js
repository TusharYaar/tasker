import React from "react";

function AccessToken({data,showAccessCode,isTaskLoading,handleGenerateToken}) {
  return (
    <div>
      {data.accessToken && showAccessCode() ? (
        <div className="mx-2 my-2 flex flex-col">
          <span>
            Access Token:{" "}
            <span className="text-lg bg-blue-200 px-2 text-blue-700 italic border-blue-600 rounded">
              {data.accessToken}
            </span>
          </span>{" "}
          <span>
            Valid Till:
            <span className="text-sm bg-yellow-200 px-2 text-yellow-700 italic mx-2 border-yellow-600 border-2 rounded">
              {" "}
              {data.tokenValidity.toDate().toLocaleString()}
            </span>
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <button
            className={`bg-blue-200 text-blue-700 border-2 border-blue-600 text-base px-2 rounded mx-2 my-1 ${
              isTaskLoading ? "cursor-not-allowed opacity-50" : null
            }`}
            onClick={handleGenerateToken}
          >
            Generate Token
          </button>
          <span className="bg-yellow-200 px-2 text-yellow-700 italic border-yellow-600 border-2 mx-2 rounded text-sm">
            Valid for 15mins
          </span>
        </div>
      )}
    </div>
  );
}

export default AccessToken;
