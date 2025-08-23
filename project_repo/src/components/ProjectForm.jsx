import React from 'react'

const ProjectForm = () => {
    return (
        <div><div className="form-container">
            <form>
                <label>Title:<input></input></label>
                <label>Description:<input></input></label>
                <label>Repo URL:<input></input></label>
                <label>Image:<input type="file" accept="image/*"></input></label>
            </form>
        </div></div>
    )
}

export default ProjectForm