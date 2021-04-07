import React, { useState, useRef } from 'react';
import axios from 'axios';

const Base64Upload = () => {
  const [base64, setBase64] = useState(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const handleClick = () => inputRef && inputRef.current && inputRef.current.click();

  const createBase64Image = (file) => {
    const reader = new FileReader();
    return new Promise(function (resolve, reject) {
      reader.onload = function (event) {
        resolve(event.target.result)
      }
      reader.readAsDataURL(file);
    })
  }

  const handleFiles = async (e) => {
    if (e.target.files[0]) {
      const base64 = await createBase64Image(e.target.files[0]);
      console.log('base64', base64);
      setBase64(base64);
      setFileName(e.target.files[0].name);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (base64 && base64 !== '') {
      axios.post('http://localhost:3001/base64', { base64Image: base64, fileName: Date.now() + '-' + fileName })
        .then(data => setMessage(data.data.message))
        .catch((error) => setMessage('Error'));
      setBase64(null);
      setFileName('');
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
        Click to Upload file (Base64) <hr />
        {fileName}
      </div>
      <input type="file" ref={inputRef} onChange={handleFiles} style={{ display: 'none' }} accept="image/*" />
      <button type="submit" className="mui-btn mui-btn--primary" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default Base64Upload;
