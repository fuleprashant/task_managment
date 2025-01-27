import React from "react";
import Card from "../components/Card";

const CompleteTask = () => {
  return (
    <div>
      <Card addData={false} task_type="completed" />
    </div>
  );
};

export default CompleteTask;
