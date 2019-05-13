import * as React from "react";

export interface IProps {
  circleRadius: number;
  coordinates: { x: number, y: number} [];
}

export interface IState {

}

class Line extends React.Component<IProps, IState> {

  render() {
    return (
      <svg className="line" style={{ width: 200 + 'px', height: 200 + 'px'} }>
        <line 
        x1={this.props.coordinates[0].x + this.props.circleRadius * 2} y1={this.props.coordinates[0].y + this.props.circleRadius * 2} 
        x2={this.props.coordinates[1].x + this.props.circleRadius * 2} y2={this.props.coordinates[1].y + this.props.circleRadius * 2} 
        />
      </svg>
    );
  }

}

export default Line;