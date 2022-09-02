import React from 'react';
import "../../assets/stylesheets/project/project.scss";

class ProjectForm extends React.Component{
    constructor(props){

        super(props)

        this.state = {
            name: "",
            ownerId: props.currentUser,
            members: [],
            description: "",
            tasks: []
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.formType === "Update Project") {
            this.setState({
                // do I also need to set the ID to the project's id? 
                name: this.props.project.name,
                description: this.props.project.description
            })
        }
    }

    handleSubmit(e){
        debugger
        e.preventDefault();
        this.props.processForm(this.state);
        this.props.closeModal();
    }

    handleUpdate(field){
        return (e) => {
            this.setState({[field]: e.currentTarget.value})
        }
    }

    render() {
        return(
        <div>
            <h1>{this.props.formType}</h1>
            <form className="create-project-header" onSubmit={this.handleSubmit}>
                <label className="create-project-label">Name:
                    <input className="create-project-input" type="text"
                            value={this.state.name}
                            onChange={this.handleUpdate("name")} />
                </label>
                <br />
                <label className="create-project-label">Description:
                    <input className="create-project-input" type="text" 
                            value={this.state.description}
                            onChange={this.handleUpdate("description")} />
                </label>
                <br />
                <input type="submit" value={ this.props.formType === "Create a Project" ? 'Create Project' : 'Update Project'} />
                {/* {(this.props.formType === "Update Project") ? 
                        <button onClick={() => { this.props.deleteProject(this.state.id), this.props.closeModal()}}>Delete project</button>
                        : null } */}
            </form>
        </div>
    )}
}

export default ProjectForm;