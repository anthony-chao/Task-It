import React from "react";

class AddProjectMember extends React.Component {

    constructor(props){

        super(props);

        this.state={
            email: ""
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUpdate(field){
        return (e) => {
            this.setState({[field]: e.currentTarget.value})
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.addProjectMember(this.state.email);
    }

    render(){
        return(
        <div className="add-user-form">
            <h3>{this.props.teams[this.props.modalTeam].name}</h3>
            <span>Please enter the email of the user you want to invite:</span>
            <form onSubmit={this.handleSubmit}>
                <label>
                    <p>Email:</p>
                    <input type="text" value={this.state.email} onChange={this.handleUpdate("email")} />
                </label>
                <input type="submit" value="Add User" className="submit"/>
            </form>
        </div>)}
}

export default AddProjectMember;