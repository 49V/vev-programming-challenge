import * as React from "react";

export interface IProps {
  circleRadius: number;
  coordinates: { x: number, y: number} [];
}

export interface IState {

}

class Line extends React.Component<IProps, IState> {

  componentDidMount(){
    this.calculateInputPosition();
  }

  calculateInputPosition = (): { left: string, top: string } => {
    // Our input box should be put between both of our circles
    const left: string = ((this.props.circleRadius + this.props.coordinates[1].x - this.props.coordinates[0].x) / 2).toString() + 'px';
    const top: string = ((this.props.circleRadius + this.props.coordinates[1].y - this.props.coordinates[0].y + 50) / 2).toString() + 'px'; 

    return {left, top}
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
      <span className="line-settings" style={this.calculateInputPosition()}>
        <label>
          <input id="length" type="number" name="length" defaultValue="wow"/>
        </label>
      </span>
    </React.Fragment>
    );
  }

}

export default Line;