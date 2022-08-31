import React from 'react';

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
        e.preventDefault();
        this.props.createProject(this.state);
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
            <form onSubmit={this.handleSubmit}>
                <label>Title:
                    <input type="text"
                            value={this.state.name}
                            onChange={this.handleUpdate("title")} />
                </label>
                <label>Description:
                    <input type="text" 
                            value={this.state.description}
                            onChange={this.handleUpdate("description")} />
                </label>
                <input type="submit" value={ this.props.formType === "Create a Project" ? 'Create Project' : 'Update Project'} />
                {(this.props.formType === "Update Project") ? 
                        <button onClick={() => { this.props.deleteProject(this.state.id), this.props.closeModal()}}>Delete project</button>
                        : null }
            </form>
        </div>
    )}
}

export default ProjectForm;