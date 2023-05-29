// Problem statement from https://www.youtube.com/watch?v=A0BmLYHLPZs
// When a user clicks on the page, place a circle in that position
// Have a button to undo and redo circle placements

import { useState } from "react";

export default function PlaceCircle() {
  const [circleStack, setCircleStack] = useState([]);
  const [undoneStack, setUndoneStack] = useState([]);

  const handlePlaceCircle = (x, y) => {
    // offsets for correct placement
    const circle = { x: x - 50, y: y - 50 };
    const currentCircles = [...circleStack];
    currentCircles.push(circle);
    setCircleStack(currentCircles);
  };

  const handleUndo = () => {
    const currentCircles = [...circleStack];
    const undone = currentCircles.pop();
    setCircleStack(currentCircles);

    const currentUndoneStack = [...undoneStack];
    currentUndoneStack.push(undone);
    setUndoneStack(currentUndoneStack);
  };

  const handleRedo = () => {
    const currentCircles = [...circleStack];
    const currentUndoneStack = [...undoneStack];

    const redo = currentUndoneStack.pop()
    if (redo === undefined) return
    
    currentCircles.push(redo)
    setCircleStack(currentCircles)
    setUndoneStack(currentUndoneStack)
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 10,
          gap: 10,
        }}
      >
        <button
          style={{ width: "200px", height: "30px" }}
          onClick={() => handleUndo()}
        >
          Undo
        </button>
        <button style={{ width: "200px", height: "30px" }} onClick={() => handleRedo()}>Redo</button>
      </div>
      <div
        style={{ width: "100vw", height: "100vh" }}
        onClick={(e) => handlePlaceCircle(e.clientX, e.clientY)}
      >
        {circleStack.map((circle, idx) => (
          <div
            key={idx}
            style={{ position: "absolute", top: circle.y, left: circle.x }}
          >
            <svg height="100" width="100">
              <circle
                cx="50"
                cy="50"
                r="5"
                stroke="black"
                strokeWidth="3"
                fill="red"
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
