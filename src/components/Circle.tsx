import * as React from "react";

export interface IProps {

}

export interface IState {
  coordinates: {
    x: number;
    y: number;
  }
}

class Circle extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      coordinates: {
        x: 0,
        y: 0
      }
    };
  } 

  componentDidMount() {
    this.setState(this.getCoordinates());
  }
  
  getCoordinates = (): IState => {
    // Grab the circle element from the DOM
    const circle: any = document.querySelector(".circle");

    // Get the x and y coordinates relative to the top left of the window
    const {x, y} = circle.getBoundingClientRect();

    // Populate our coordinates object and round down to nearest number
    // Additionally, we need to set the coordinates relative to the document so that it doesn't change as we scroll
    const coordinates: IState = { 
      coordinates: 
        {
          x: Math.floor(x + window.pageXOffset), 
          y: Math.floor(y + window.pageYOffset)
        } 
      };

    return coordinates;
  }

  render() {
    return(
      <div className="circle">
        <span className="text">
          <div>
            X : {this.state.coordinates.x}
          </div>
          <div>
            Y : {this.state.coordinates.y}
          </div>
        </span>
      </div>

    );
  }

} 

export default Circle;
