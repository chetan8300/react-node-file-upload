import React, { useRef, useState } from 'react';
import axios from 'axios';

const MultipleUpload = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const handleClick = () => inputRef && inputRef.current && inputRef.current.click();
  const handleFiles = (e) => setFiles(e.target.files ? Array.from(e.target.files) : []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach(file => formData.append('multipleImages', file));
      axios.post('http://localhost:3001/multiple', formData)
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
        Click & Select files to Upload (Multiple) <hr />
        {files.map((x, index) => <React.Fragment key={index}>{x.name}<br/></React.Fragment>)}
      </div>
      <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} multiple />
      <button type="submit" className="mui-btn mui-btn--primary" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default MultipleUpload;
