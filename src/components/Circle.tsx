import * as React from "react";

export interface IProps {
  changeCircleCoordinates: any;
  setDraggable: any;
  id: number;
  x: number;
  y: number;
}

export interface IState {

}

class Circle extends React.Component<IProps, IState> {

  componentDidMount() {
    // Set the circle to be draggable when it renders
    this.props.setDraggable("circle-" + this.props.id);
  }

  updatePosition = (event: any): void => {
    
    event.preventDefault();
    let newCoordinates: { x: number, y: number };
    let targetedInput : 'x' | 'y';

    // Get our input from the DOM
    const convertedInput: number = parseFloat(event.target.value);
    targetedInput = event.target.id;

    // Make sure we aren't handing strings to the coordinates or else we'll get type coercion
    if(this.isNumeric(convertedInput)) {
      if(targetedInput === 'x') {
        // Case 1: We update x
        const newX: number = convertedInput;
        newCoordinates = {
          x: newX,
          y: this.props.y
        }
        this.props.changeCircleCoordinates(newCoordinates, this.props.id);
      } else if(targetedInput === 'y') {
        // Case 2: We update y
        const newY: number = convertedInput;
        newCoordinates = {
          x: this.props.x,
          y: newY
        }
        this.props.changeCircleCoordinates(newCoordinates, this.props.id);
      }
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
              X : <input id="x" type="number" name="x" onChange={this.updatePosition} value={`${this.props.x}`} />
            </label>
            <label>
              Y : <input id="y" type="number" name="y" onChange={this.updatePosition} value={`${this.props.y}`} />
            </label>
        </span>
      </div>
    );
  }

} 

export default Circle;
