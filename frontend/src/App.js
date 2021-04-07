import React, { useState, useRef } from 'react';
import './App.css';

import SingleUpload from './SingleUpload';
import MultipleUpload from './MultipleUpload';
import Base64Upload from './Base64Upload';

const App = () => {
  const [selectedOption, setSelectedOption] = useState('single');
  const uploadForm = useRef(null);

  const handleSelectedOption = e => setSelectedOption(e.target.value);
  const resetForm = uploadForm && uploadForm.current && uploadForm.current.reset();

  return (
    <React.Fragment>
      <header className="mui-appbar mui--z1">
        <div className="mui-container">
          <table>
            <thead>
              <tr className="mui--appbar-height">
                <td className="mui--text-title">React File Upload</td>
              </tr>
            </thead>
          </table>
        </div>
      </header>
      <div id="content-wrapper" className="mui-container mui--text-center">
        <div className="mui--appbar-height" />
        <div className="mui--text-left">
          <div className="mui-radio">
            <label>
              <input type="radio" name="optionsRadios" value="single" onChange={handleSelectedOption} checked={selectedOption === 'single'} /> Single File Upload
            </label>
          </div>
          <div className="mui-radio">
            <label>
              <input type="radio" name="optionsRadios" value="multiple" onChange={handleSelectedOption} checked={selectedOption === 'multiple'} /> Multiple Files Upload
            </label>
          </div>
          <div className="mui-radio">
            <label>
              <input type="radio" name="optionsRadios" value="base64" onChange={handleSelectedOption} checked={selectedOption === 'base64'} /> Upload as a Base64
            </label>
          </div>
        </div>
        <div className="mui--appbar-height" />
        <div className="mui--text-center">
          {selectedOption === 'single' ?
            <SingleUpload resetForm={resetForm} />
            :
            selectedOption === 'multiple' ?
              <MultipleUpload resetForm={resetForm} />
              :
              <Base64Upload resetForm={resetForm} />
          }
        </div>
      </div>
      <footer>
        <div className="mui--appbar-height" />
        <div className="mui-container mui--text-center">
          Made with ♥ by <a href="https://chetangodhani.com">Chetan Godhani</a>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
