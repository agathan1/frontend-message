import React from "react";

export default function Skeleton({ ...props }) {
  return (
    <div role="status" className="animate-pulse">
      <div {...props}></div>
    </div>
  );
}
