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

export interface IState {

}

class Line extends React.Component<IProps, IState> {

  updatePosition = (event: any): void => {

    // Take the input and convert it to a Float
    const xLength = this.props.coordinates[1].x - this.props.coordinates[0].x;
    const yLength = this.props.coordinates[1].y - this.props.coordinates[0].y;
    const theta = this.props.getPolarCoordinates(xLength, yLength).theta;
    const newLengthInput = parseFloat(event.target.value);
    
    this.props.changeLineLength(newLengthInput, this.props.id, theta);
  }

  render() {

    return (
      <React.Fragment>
      <svg className="line" style={{ width: 200 + 'px', height: 200 + 'px'} }>
        <line 
        x1={this.props.coordinates[0].x + this.props.circleRadius * 2} y1={this.props.coordinates[0].y + this.props.circleRadius * 2} 
        x2={this.props.coordinates[1].x + this.props.circleRadius * 2} y2={this.props.coordinates[1].y + this.props.circleRadius * 2} 
        />
      </svg>
      <div className="line-settings" style={this.props.inputPosition} >
        <label>
          <input id="length" type="number" name="length" onChange={this.updatePosition} value={`${this.props.length}`}/>
        </label>
      </div>
    </React.Fragment>
    );
  }

}

export default Line;