import React, {  useState } from 'react';
import { signup } from '../axiosAPI/Users.js';
import { useNavigate  } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    repeatPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.lastname.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.password.trim() ||
      !formData.repeatPassword.trim() ||
      formData.password !== formData.repeatPassword
    ) {
      setError('Please fill in all fields correctly');
      return;
    }

    signupUser(formData);
  };

  const signupUser = async (newUser) => {
    try {
      newUser.userType="User";
      const response = await signup(newUser);
      console.log(response);
      if(response.status===200 || response.status===201 ){
        if(response.data.savedUser) {
            navigate('/Auth/Login');          
          }  
        else {
          setError(response.data.message);
        }
      }
      else {
        setError("Server error ! ");
      }
    } catch (error) {
      console.error('Registration error:', error.response.data);
      setError(error.response.data);
    }
  };

  return (
    <div className='bg-light'>
      <div className='container py-5'>
        <h2 className="mb-3 text-center">Register</h2>
        <div className="row g-2 mb-5">
          <div className="col-12">
            <div className="rounded border shadow p-3 text-center h-100">
              <form className="row gx-3 gy-2 align-items-center" onSubmit={submitRegister}>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="name">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    id="name"
                    placeholder="First Name"
                  />
                </div>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.lastname}
                    onChange={handleChange}
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                  />
                </div>
                <div className="col-12">
                  <label className="visually-hidden" htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                  />
                </div>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    name="address"
                    id="address"
                    placeholder="Address"
                  />
                </div>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="password">Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    id="password"
                    placeholder="Password here"
                  />
                </div>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="repeatPassword">Repeat Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    name="repeatPassword"
                    id="repeatPassword"
                    placeholder="Repeat Password"
                  />
                </div>
                {error && <div className="col-12 text-danger">{error}</div>}
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
