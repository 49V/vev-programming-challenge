import * as React from "react";

export interface Props {

}

export interface State {

}

class Circle extends React.Component<Props, State> {

  render() {
    return(
      <div className="circle">
        <span className="text">
          LOL!
        </span>
      </div>

    );
  }

} 

export default Circle;
