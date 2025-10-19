import React from "react";
import {Ducky} from "./Ducky";
import { NameInputBox } from "./NameInputBox";
import { useNavigate } from "react-router-dom";

export function CreationPage() {

  const navigate = useNavigate();
  const handleNameSubmit = (name) => {
    navigate('/', {state: {passedDuck: name}});
  };

  return (
    <div className="bg-bg bg-repeat bg-contain h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Ducky name=""/>
      <NameInputBox onSubmit={handleNameSubmit} />
    </div>
  );
};

