import * as React from "react";

export interface IProps {
  circleRadius: number;
  coordinates: { x: number, y: number} [];
  convertPolarToCartesian: any;
  getPolarCoordinates: any;
  id: number;
}

export interface IState {

}

// Is I should create a state component in the parent that keeps track of line coordinates
  // {r: , theta:, id: this can be linked to the parent}
  //  That way, we could have multiple circles and multiple lines and the code would still work

class Line extends React.Component<IProps, IState> {

  /*
  * Calculates the input position of the component from the given props
  */
  calculateInputPosition = (): { left: string, top: string } => {

    const xLength = this.props.coordinates[1].x - this.props.coordinates[0].x;
    const yLength = this.props.coordinates[1].y - this.props.coordinates[0].y;

    // We use the first circle as our reference and get the length first in it's polar form
    const { r, theta } = this.props.getPolarCoordinates(xLength, yLength);

    // Then we convert it into cartesian coordinates such that we can place our input box relative to our first circle
    const { x, y } = this.props.convertPolarToCartesian(r, theta);

    // Remember that our box is directly between our two circles (Hence we divide by two to get our offset relative to the first circle)
    const xOffset = x / 2;
    const yOffset = y / 2;

    // Our input box should be put between both of our circles
    const left: string =  ((this.props.coordinates[0].x + xOffset)).toString() + 'px';
    const top: string =   ((this.props.coordinates[0].y + yOffset + 50)).toString() + 'px'; 

    return { left, top }
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
          <input id="length" type="number" name="length" value={`${this.props.getPolarCoordinates(xLength, yLength).r}`}/>
        </label>
      </div>
    </React.Fragment>
    );
  }

}

export default Line;