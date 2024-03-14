import React, { useState } from 'react'
import axios from 'axios'
const Api = () => {
  const [formData, setFormData] = useState({
    class: '',
    rollNumber: '',
    name: '',
    course: ''
  });
  const [alertMessage,setalertMessage]=useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleAlert=()=>{
    setalertMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const requestBody={
      "class":formData.class,
      "rollNo":Number(formData.rollNumber),
      "name":formData.name,
      "course":formData.course
    }
    console.log(requestBody)
    console.log(typeof requestBody.rollNo)
    axios.post('https://yfxmmviyv0.execute-api.ap-south-1.amazonaws.com/createStudent', requestBody)
  .then(response => {
    // Handle the response data
    setalertMessage(response.data)
    setFormData({})
    console.log(response);
  })
  .catch(error => {
    // Handle errors
    console.error('There was a problem with the axios request:', error);
  });
  }
  return (
    <>
    
    
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection:'column', alignItems: 'center', height: '50vh',width:'100vw' }}>
    {alertMessage !== '' && (
      <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>{alertMessage}</strong> 
      <button type="button" class="close" data-dismiss="alert" onClick={handleAlert} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    )}
    <div className="container">
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="class">Class:</label>
          <input type="text" className="form-control" id="class" name="class" value={formData.class} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input type="number" className="form-control" id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <input type="text" className="form-control" id="course" name="course" value={formData.course} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <a href="/update"><button type="button" className="btn btn-primary ml-3">Update Student</button></a>
        
      </form>
    </div>
    </div>
    </>
  )
}

export default Api
