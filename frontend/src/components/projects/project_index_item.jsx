import React from 'react';

class ProjectIndexItem extends React.Component {
  render() {
    debugger
    return (
        <div>
            <ul>
                <li>Name: {this.props.name}</li>
                <li>Description: {this.props.description}</li>
            </ul>
        </div>
    );
  }
}

export default ProjectIndexItem;