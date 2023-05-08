import { useState } from 'react';
import './App.css'

type Point = {
  x: number;
  y: number;
}

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [allPoints, setAllPoints] = useState<Point[]>([])

  const handleClick = (event: React.MouseEvent) => {
    const {clientX, clientY} = event;
    setPoints([...points, {x: clientX, y: clientY}]);
  }

  const handleUndo = () => {
    const newPoints = [...points];
    const lastPoint = newPoints.pop();
    if (lastPoint !== undefined){
      setAllPoints([...allPoints, lastPoint]);
    }
    setPoints(newPoints);
  }

  const handleRedo = () => {
    const redoPoints = [...allPoints];
    const pointToAdd = redoPoints.pop();
    if (pointToAdd !== undefined){
      setPoints([...points, pointToAdd]);
    }
    setAllPoints(redoPoints); 
  }

  return (
    <>
      <div className='buttons'>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <div className='App' onClick={handleClick}>
        {points.map(point => <div key={point.y+point.x} className='point' style={{top: point.y, left: point.x,}}></div>)}
      </div>
    </>
  )
}

export default App
