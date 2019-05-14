import React from 'react';
import './styles/App.css';

import Circle from './components/Circle';
import Line from './components/Line';

export interface Props {
  circleRadius: number;
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
        {x: 250, y: 250},
      ],
      currentDraggableComponent: null,
      referenceCoordinates: {x: 0, y: 0}
    }
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.clearSelectedComponent);
    document.addEventListener("mousemove", this.updateDraggedComponent);
  }

  //  CIRCLE FUNCTIONS
  // -------------------------------------------------------------------------------------------
  // 

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

  //  LINE FUNCTIONS
  // -------------------------------------------------------------------------------------------
  // 

  /*
  * Calculates the position of the input box on the line component from the given props
  */
 calculateInputPosition = (lineId: number): { left: string, top: string } => {

  const xLength = this.state.coordinates[lineId + 1].x - this.state.coordinates[lineId].x;
  const yLength = this.state.coordinates[lineId + 1].y - this.state.coordinates[lineId].y;

  // We use the first circle as our reference and get the length first in it's polar form
  const { r, theta } = this.getPolarCoordinates(xLength, yLength);

  // Then we convert it into cartesian coordinates such that we can place our input box relative to our first circle
  const { x, y } = this.convertPolarToCartesian(r, theta);

  // Remember that our box is directly between our two circles (Hence we divide by two to get our offset relative to the first circle)
  const xOffset = x / 2;
  const yOffset = y / 2;

  // Our input box should be put between both of our circles
  const left: string =  ((this.state.coordinates[lineId].x + xOffset)).toString() + 'px';
  const top: string =   ((this.state.coordinates[lineId].y + yOffset + 50)).toString() + 'px'; 

  return { left, top }
}

  /*
  * Changes the length of a given line, and updates coordinates accordingly
  */
  changeLineLength = (newLineLength: number, lineId: number, theta: number) : void => {

    // Our theta remain the same, but our line length changes. Get the appropriate cartesian coordinates
    const { x, y } = this.convertPolarToCartesian(newLineLength, theta);

    // We then change the relevant coordinates (our lineId tells us the circle that it is linked to)
    let updatedCoordinates = this.state.coordinates;

    // We have a pair of circles which are connected by a line. We use the first circle as the reference
    let referenceCoordinates = this.state.coordinates[lineId];
    // And we offset the second circle based upon the length of the line
    let newCoordinates = {x: referenceCoordinates.x + x, y: referenceCoordinates.y + y};

    // We use the first circle as the reference, therefore we change the next circle's coordinates as length changes
    updatedCoordinates[lineId + 1] = newCoordinates;

    this.setState({
      coordinates: updatedCoordinates
    });
  }

  /*
  * Converts Polar Coordinates (r, theta) to Cartesian Coordinates (x, y)
  */
  convertPolarToCartesian = (r: number, theta: number) : { x: number, y: number } => {
    const x: number = r * Math.cos(theta);
    const y: number = r * Math.sin(theta);

    return { x, y };
  }

  /*
  * Gets the polar coordinates of a given an xLength (width) and yLength(height)
  */
  getPolarCoordinates = (xLength: number, yLength: number): { r: number, theta: number } => {

    // This is just pythagorous
    const r: number = (Math.sqrt((xLength ** 2) + (yLength ** 2) ));
    const theta: number = Math.atan2(yLength, xLength);

    return { r, theta };
  }

  //  DRAG FUNCTIONS
  // -------------------------------------------------------------------------------------------
  // 

  /*
  * Sets the state of currentDraggableComponent to null when the left mouse button is released
  */
  clearSelectedComponent = () : void => {
    this.setState({
      currentDraggableComponent: null
    });
  }

  /*
  * Sets an element with a given ID to be draggable
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
  * Changes the position of an element as it is dragged
  */
 updateDraggedComponent = (event: any): void => {

  // If we don't have an element selected, just return
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

    let lines: any = [];
    // For N circles we have N - 1 lines
    for(let index = 0; index < this.state.coordinates.length - 1; index++) {
      // For every line, we have a pair of coordinates (the two circles that the line links)
      const coordinates = [ this.state.coordinates[index], this.state.coordinates[index + 1] ];

      lines[index] = <Line key={index} changeLineLength={this.changeLineLength} circleRadius={this.props.circleRadius} coordinates={coordinates} convertPolarToCartesian={this.convertPolarToCartesian} getPolarCoordinates={this.getPolarCoordinates} id={index} inputPosition={this.calculateInputPosition(index)} />
    }

    return(
      <>
        {circles}
        {lines}
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
