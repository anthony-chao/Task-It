import React, { useState } from 'react';
// Placeholder for create project

const ProjectForm = props => {

    const [projectInfo, setProjectInfo] = useState({
        name: '',
        ownerId: '',
        members: [],
        description: '',
        tasks: []
    })

    const update = field => {
        return e => setProjectInfo({
            ...userInfo, [field]: e.currentTarget.value
        });
    }

    const closeModal = (e) => {
        e.preventDefault();
        props.closeModal();
    }

    const { formType, otherForm } = props;

    return (
        <div className="modal-content">
            <h1>{}</h1>

        </div>
    )
    
}