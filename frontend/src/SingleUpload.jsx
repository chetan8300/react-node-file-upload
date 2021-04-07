import React, { useRef, useState } from 'react';
import axios from 'axios';

const SingleUpload = ({ resetForm }) => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleClick = () => inputRef && inputRef.current && inputRef.current.click();
  const handleFiles = (e) => setFiles(e.target.files ? e.target.files : []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(files.length > 0) {
      const formData = new FormData();
      formData.append('singleImage', files[0]);
      axios.post('http://localhost:3001/single', formData)
        .then(data => setMessage(data.data.message))
        .catch((error) => setMessage('Error'));
      setFiles([]);
      formRef.current && formRef.current.reset();
      setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  }

  return (
    <form ref={formRef}>
      <div className="mui--text-dark-secondary mui--text-button">{message}</div>
      <div className="upload-box" onClick={handleClick}>
        Click to Upload file (Single) <hr />
        {files[0] && files[0].name}
      </div>
      <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} />
      <button className="mui-btn mui-btn--primary" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default SingleUpload;
