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

  const updatePosition = (event: any): void => {

    // Take the input and convert it to a Float
    const xLength = props.coordinates[1].x - props.coordinates[0].x;
    const yLength = props.coordinates[1].y - props.coordinates[0].y;
    const theta = props.getPolarCoordinates(xLength, yLength).theta;
    const newLengthInput = parseFloat(event.target.value);
    
    props.changeLineLength(newLengthInput, props.id, theta);
  }

  return (
    <React.Fragment>
    <svg className="line" style={{ width: 200 + 'px', height: 200 + 'px'} }>
      <line 
      x1={props.coordinates[0].x + props.circleRadius * 2} y1={props.coordinates[0].y + props.circleRadius * 2} 
      x2={props.coordinates[1].x + props.circleRadius * 2} y2={props.coordinates[1].y + props.circleRadius * 2} 
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