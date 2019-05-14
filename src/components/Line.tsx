import * as React from "react";

export interface IProps {
  circleRadius: number;
  coordinates: { x: number, y: number} [];
}

export interface IState {

}

class Line extends React.Component<IProps, IState> {

  /*
  * Calculates the input position of the component from the given props
  */
  calculateInputPosition = (): { left: string, top: string } => {

    const xLength = this.props.coordinates[1].x - this.props.coordinates[0].x;
    const yLength = this.props.coordinates[1].y - this.props.coordinates[0].y;

    // We use the first circle as our reference and get the length first in it's polar form
    const { r, theta } = this.getPolarCoordinates(xLength, yLength);

    // Then we convert it into cartesian coordinates such that we can place our input box relative to our first circle
    const { x, y } = this.convertPolarToCartesian(r, theta);

    // Remember that our box is directly between our two circles (Hence we divide by two to get our offset relative to the first circle)
    const xOffset = x / 2;
    const yOffset = y / 2;

    // Our input box should be put between both of our circles
    const left: string =  ((this.props.coordinates[0].x + xOffset)).toString() + 'px';
    const top: string =   ((this.props.coordinates[0].y + yOffset + 50)).toString() + 'px'; 

    return { left, top }
  }

  /*
  * Gets the polar coordinates of a given an xLength (width) and yLength(height)
  */
  getPolarCoordinates = (xLength: number, yLength: number): { r: number, theta: number } => {

    // This is just pythagorous
    const r: number = Math.floor(Math.sqrt((xLength ** 2) + (yLength ** 2) ));
    const theta: number = Math.atan2(yLength, xLength);

    return { r, theta };
  }

  /*
  * Converts Polar Coordinates (r, theta) to Cartesian Coordinates (x, y)
  */
 convertPolarToCartesian = (r: number, theta: number) : { x: number, y: number } => {
    const x: number = r * Math.cos(theta);
    const y: number = r * Math.sin(theta);

    return { x, y };
 }


  render() {

    const xLength = this.props.coordinates[1].x - this.props.coordinates[0].x;
    const yLength = this.props.coordinates[1].y - this.props.coordinates[0].y;

    return (
      <React.Fragment>
      <svg className="line" style={{ width: 200 + 'px', height: 200 + 'px'} }>
        <line 
        x1={this.props.coordinates[0].x + this.props.circleRadius * 2} y1={this.props.coordinates[0].y + this.props.circleRadius * 2} 
        x2={this.props.coordinates[1].x + this.props.circleRadius * 2} y2={this.props.coordinates[1].y + this.props.circleRadius * 2} 
        />
      </svg>
      <div className="line-settings" style={this.calculateInputPosition()} >
        <label>
          <input id="length" type="number" name="length" value={`${this.getPolarCoordinates(xLength, yLength).r}`}/>
        </label>
      </div>
    </React.Fragment>
    );
  }

}

export default Line;