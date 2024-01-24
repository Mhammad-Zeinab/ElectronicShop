import React, { useContext, useState } from 'react';
import { AppContext } from '../index';

const initialFormData = {
  name: '',
  brand: '',
  category: 'Other',
  price: '',
};

export default function AddProduct({ toggleAddForm }) {
  const { addProductToList } = useContext(AppContext);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkValidation()) {
      addProductToList(formData);
      setFormData(initialFormData);
      toggleAddForm();
    } else {
      alert('Please fill in all required fields and provide a valid price.');
    }
  };

  const checkValidation = () => {
    const { name, brand, price } = formData;
    return name && brand && !isNaN(parseFloat(price)) && parseFloat(price) > 0;
  };
  

  return (
    <li className="nav-item" style={{ marginTop: 20 }}>
      <div className="rounded border shadow p-4 text-center h-100">
        <div className="container my-4">
          <div className="row">
            <div className="col-md-8 mx-auto rounded border p-4">
              <h2 className="text-center mb-5">Add Product</h2>
              <form onSubmit={handleSubmit}>
                {/* Form inputs */}
                {Object.keys(formData).map((key, index) => (
                  <div key={index} className="row mb-3">
                    <label className="col-sm-4 col-form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <div className="col-sm-8">
                      {key === 'category' ? (
                        <select
                          className="form-select"
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                        >
                          <option value="Other">Other</option>
                          <option value="Phones">Phones</option>
                          <option value="Computers">Computers</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Printers">Printers</option>
                          <option value="Cameras">Cameras</option>
                        </select>
                      ) : (
                        <input
                          className={key === 'price' ? 'form-control' : 'form-control'}
                          name={key}
                          type={key === 'price' ? 'number' : 'text'}
                          value={formData[key]}
                          onChange={handleChange}
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div className="row">
                  <div className="offset-sm-4 col-sm-4 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                  <div className="col-sm-4 d-grid">
                    <button className="btn btn-secondary" onClick={toggleAddForm}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
