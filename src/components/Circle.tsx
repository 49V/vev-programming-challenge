import * as React from "react";

export interface IProps {
  changeCircleCoordinates: any;
  draggable: any;
  id: number;
  x: number;
  y: number;
}

export interface IState {

}

class Circle extends React.Component<IProps, IState> {

  componentDidMount() {
    // Set the circle to be draggable when it renders
    this.props.draggable("circle-" + this.props.id);
  }

  updatePosition = (event: any): void => {
    
    event.preventDefault();
    let newCoordinates;

    const convertedInput = parseFloat(event.target.value);

    if(this.isNumeric(convertedInput)) {
      if(event.target.id === 'x') {
        // Case 1: We update x
        const newX = convertedInput;
        newCoordinates = {
          x: newX,
          y: this.props.y
        }

      } else if(event.target.id === 'y') {
        // Case 2: We update y
        const newY = convertedInput;
        newCoordinates = {
          x: this.props.x,
          y: newY
        }
      }
      this.props.changeCircleCoordinates(newCoordinates, this.props.id);
    } 
    return;
  }

  // Returns true if the value is numeric, otherwise false
  isNumeric = (value: any): boolean => {
    return !isNaN(value);
  }

  render() {
    return(
      <div className="circle" id={`circle-${this.props.id}`} style={{left: this.props.x + 'px', top: this.props.y + 'px'}}>
        <span className="text">
            <label>
              X : <input id="x" type="number" name="x" onChange={this.updatePosition} value={`${Math.floor(this.props.x)}`} />
            </label>
            <label>
              Y : <input id="y" type="number" name="y" onChange={this.updatePosition} value={`${Math.floor(this.props.y)}`} />
            </label>
        </span>
      </div>
    );
  }

} 

export default Circle;
