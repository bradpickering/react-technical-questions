// Problem statement from https://www.youtube.com/watch?v=5UcfBfSP2T4
// Memory game, click on a tile and try to find the matching tile

import { useState, useEffect } from "react";
export default function MemoryGame() {
  const [board, setBoard] = useState([
    [11, 8, 3, 2, 10, 15],
    [13, 1, 6, 11, 4, 0],
    [4, 9, 10, 15, 7, 13],
    [3, 5, 2, 5, 0, 6],
    [12, 1, 9, 7, 8, 12],

  ]);

  const [checking, setChecking] = useState({});
  const [showTemporarily, setShowTemporarily] = useState([]);
  const [correct, setCorrect] = useState([]);

  const checkIfCorrect = (row, col) => {
    if (showTemporarily.length == 2) {
        // only show 2 temporary cards at once
        setShowTemporarily([]);
    } 

    const show = [...showTemporarily];
    show.push({ row: row, col: col });
    setShowTemporarily(show);

    if (Object.keys(checking).length === 0) {
      // set to the checking state
      setChecking({ row: row, col: col });
    } else if (checking.row === row && checking.col === col) {
      // if you click the same tile over and over just ignore
      return;
    } else {
      // do the check and clear the checking
      if (board[checking.row][checking.col] === board[row][col]) {
          // add to the correct list, which are always shown
        const currentCorrect = [...correct];
        currentCorrect.push({ row: row, col: col });
        currentCorrect.push({ row: checking.row, col: checking.col });
        setCorrect(currentCorrect);
      } else {
          // get rid of the temporarily shown cards
          setTimeout(() => {
            setShowTemporarily([]);
        }, 200);
      }

      setChecking({});
    }
  };

  useEffect(() => {
    if (correct.length === board.length * board[0].length) alert("You win");
  }, [checkIfCorrect]);

  const isShownTemporarily = (row, col) => {
    const tempIdx = showTemporarily.findIndex(
      (tmp) => tmp.row === row && tmp.col === col
    );
    if (tempIdx === -1) return false;
    return true;
  };

  const isCorrect = (row, col) => {
    const correctIdx = correct.findIndex(
      (cor) => cor.row === row && cor.col === col
    );
    if (correctIdx === -1) return false;
    return true;
  };


  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {board.map((row, rowIdx) => (
          <div style={{ display: "flex", margin: 10, gap: 20 }}>
            {row.map((num, colIdx) => (
              <div
                style={{
                  height: "100px",
                  width: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "gray",
                  fontSize: 50,
                  cursor: "pointer",
                }}
                onClick={() => checkIfCorrect(rowIdx, colIdx)}
              >
                {isCorrect(rowIdx, colIdx) ||
                isShownTemporarily(rowIdx, colIdx) ? (
                  <span>{num}</span>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
