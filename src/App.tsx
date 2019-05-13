import React from 'react';
import './styles/App.css';

import Circle from './components/Circle';

export interface Props {

}

export interface State {
  // Create an array of objects for holding our coordinates
  coordinates: { x: number, y: number} [];
  currentDraggableComponent: any;
  referenceCoordinates: {x: number, y: number};
}

class App extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    // Initialize our circle positions
    this.state = 
    {
      coordinates : [ 
        {x: 0, y: 0},
        {x: 250, y: 250}
      ],
      currentDraggableComponent: null,
      referenceCoordinates: {x: 0, y: 0}
    }
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.clearSelectedComponent);
    document.addEventListener("mousemove", this.updateDraggedComponent);
  }

  /*
  * Function that changes the coordinates of a given circle if it exists, otherwise does nothing
  */
  changeCircleCoordinates = (newCoordinates: {x: number, y: number}, id: number ): void => {

    // First make sure that the circle exists
    if(this.state.coordinates[id]) {
      // Transform our old coordinates
      let updatedCoordinates = this.state.coordinates;
      
      // Add the newCoordinates entry
      updatedCoordinates[id] = newCoordinates;
      
      this.setState({
        coordinates: updatedCoordinates
      });
    }

    return;
  }

  /*
  * Function that sets the state of currentDraggableComponent to null when the left mouse button is released
  */
  clearSelectedComponent = () : void => {
    this.setState({
      currentDraggableComponent: null
    });
  }

   /*
  * Function that sets an element with a given ID to be draggable
  */
  setDraggable = (id: string): void => {
    const element: any = document.getElementById(id);

    // When we press down on a draggable element, that element is set as the current draggable component and take that point as our reference 
    element.onmousedown = (event: any) => {
      this.setState({
        currentDraggableComponent: element,
        referenceCoordinates: {x: event.pageX, y: event.pageY }
      });

    }
  }

  /*
  * Function that changes the position of an element as it is dragged
  */
 updateDraggedComponent = (event: any): void => {

  if(this.state.currentDraggableComponent === null) {
    return;
  } 

  // Grab the numeric id of our current draggable component so we can update its location
  const coordinateId = this.state.currentDraggableComponent.id.slice(-1);

  // Current position of our mouse cursor
  const mouseX = event.pageX; 
  const mouseY = event.pageY;

  // Current location of our component
  const currentX = this.state.coordinates[coordinateId].x;
  const currentY = this.state.coordinates[coordinateId].y;

  // Grab the current location of our mouse cursor and get the difference
  const deltaX: number = mouseX - this.state.referenceCoordinates.x;
  const deltaY: number = mouseY - this.state.referenceCoordinates.y;

  // Set the new location
  const newCoordinates = {
    x: currentX + deltaX,
    y: currentY + deltaY
  };

  let updatedCoordinates = this.state.coordinates;
  updatedCoordinates[coordinateId] = newCoordinates;

  // Set the new location and update the reference to where our mouse is
  this.setState({
    coordinates: updatedCoordinates,
    referenceCoordinates: {x: mouseX, y: mouseY}
  });


 }
  
  render() {

    const circles = this.state.coordinates.map( (coordinate, index) => {
      return(
        <Circle changeCircleCoordinates={this.changeCircleCoordinates} draggable={this.setDraggable} id={index} key ={index} x={coordinate.x} y={coordinate.y} />
      );
    });

    return(
      <>
        {circles}

        <section className="problem">
          <h1>
            Problem description
          </h1>
          <article className="description">
          It should be possible to drag the circles, and the line should be drawn between the circles. The input fields shows the position of the circles and the length of the line, all the inputs should be possible to edit, and the related ui should update.
          </article>
        </section>
      </>
    );
  }
}

export default App;
