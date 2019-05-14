import * as React from "react";

export interface IProps {
  changeLineLength: any;
  circleRadius: number;
  coordinates: { x: number, y: number} [];
  convertPolarToCartesian: any;
  getPolarCoordinates: any;
  id: number;
  inputPosition: { left: string, top: string}
  length: number;
}

function Line (props: IProps) {

  const FIRST = 0;
  const SECOND = 1;
  const LINE_HEIGHT = 200;
  const LINE_WIDTH = 200;

  const updatePosition = (event: any): void => {

    // Take the input and convert it to a Float
    const xLength = props.coordinates[SECOND].x - props.coordinates[FIRST].x;
    const yLength = props.coordinates[SECOND].y - props.coordinates[FIRST].y;
    const theta = props.getPolarCoordinates(xLength, yLength).theta;
    const newLengthInput = parseFloat(event.target.value);
    
    props.changeLineLength(newLengthInput, props.id, theta);
  }

  return (
    <React.Fragment>
    <svg className="line" style={{ width: LINE_WIDTH + 'px', height: LINE_HEIGHT + 'px'} }>
      <line 
      x1={props.coordinates[FIRST].x + props.circleRadius * 2} y1={props.coordinates[FIRST].y + props.circleRadius * 2} 
      x2={props.coordinates[SECOND].x + props.circleRadius * 2} y2={props.coordinates[SECOND].y + props.circleRadius * 2} 
      />
    </svg>
    <div className="line-settings" style={props.inputPosition} >
      <label>
        <input id="length" type="number" name="length" onChange={updatePosition} value={`${props.length}`}/>
      </label>
    </div>
  </React.Fragment>
  );

}

export default Line;