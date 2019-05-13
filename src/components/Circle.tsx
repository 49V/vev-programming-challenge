import * as React from "react";

export interface IProps {
  changeCircleCoordinates: any;
  id: number;
  x: number;
  y: number;
}

export interface IState {

}

class Circle extends React.Component<IProps, IState> {

  updatePosition = (event: any): void => {
    
    event.preventDefault();
    let newCoordinates;

    if(this.isNumeric(event.target.value)) {
      if(event.target.id === 'x') {
        // Case 1: We update x
        const newX = event.target.value;
        newCoordinates = {
          x: newX,
          y: this.props.y
        }

      } else if(event.target.id === 'y') {
        // Case 2: We update y
        const newY = event.target.value;
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
      <div className="circle" style={{left: this.props.x + 'px', top: this.props.y + 'px'}}>
        <span className="text">
          <form onChange={this.updatePosition}>
            <label>
              X : <input id="x" type="number" name="x" defaultValue={`${this.props.x}`} />
            </label>
            <label>
              Y : <input id="y" type="number" name="y" defaultValue={`${this.props.y}`} />
            </label>
          </form>
        </span>
      </div>
    );
  }

} 

export default Circle;
