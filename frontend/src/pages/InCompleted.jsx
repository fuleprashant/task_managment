import React from "react";
import Card from "../components/Card";

const InCompleted = () => {
  return (
    <div>
      <Card addData={false} task_type="Incompleted" />
    </div>
  );
};

export default InCompleted;
