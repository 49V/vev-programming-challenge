import React from 'react';
import './styles/App.css';

import Circle from './components/Circle';

export interface Props {

}

export interface State {
  // Create an array of objects for holding our coordinates
  coordinates: { x: number, y: number} [];
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
      ]
    }
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

  render() {

    const circles = this.state.coordinates.map( (coordinate, index) => {
      return(
        <Circle changeCircleCoordinates={this.changeCircleCoordinates} id={index} key ={index} x={coordinate.x} y={coordinate.y} />
      );
    });

    return(
      <React.Fragment>
        
        {circles}

        <section className="problem">
          <h1>
            Problem description
          </h1>
          <article className="description">
          It should be possible to drag the circles, and the line should be drawn between the circles. The input fields shows the position of the circles and the length of the line, all the inputs should be possible to edit, and the related ui should update.
          </article>
        </section>

      </React.Fragment>

    );
  }
}

export default App;
