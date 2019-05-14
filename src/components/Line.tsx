import * as React from "react";

export interface IProps {
  changeLineLength: any;
  circleRadius: number;
  coordinates: { x: number, y: number} [];
  id: number;
  inputPosition: { left: string, top: string}
  length: number;
  theta: number;
}

function Line (props: IProps) {

  const FIRST = 0;
  const SECOND = 1;
  const LINE_HEIGHT = 200;
  const LINE_WIDTH = 200;

  const updatePosition = (event: any): void => {

    // Take the input and convert it to a Float
    const newLengthInput = parseFloat(event.target.value);
    
    props.changeLineLength(newLengthInput, props.id, props.theta);
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