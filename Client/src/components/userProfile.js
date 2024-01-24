import React, { useContext } from 'react';
import { UserContext } from '../index';
import { Navigate } from 'react-router-dom';


export default function UserProfile() {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);
    const userData=currentUser.user;
    
      if(!currentUser.accessToken){
        Navigate('/Home');
      }
      else{
          return (
            <div className='bg-light'>
              <div className='container py-5'>
                <h2 className="mb-3 text-center">Profile</h2>
                <div className="row g-2 mb-5">
                  <div className="col-12">
                    <div className="rounded border shadow p-3 text-center h-100">
                      <form className="row gx-3 gy-2 align-items-start">
                        <div className="col-12 " style={{textAlign:'left'}}>
                          <label htmlFor="firstname"  style={{marginLeft:8}} className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData.name || ''}
                            id="firstname"
                            placeholder="First Name"
                            readOnly
                          />
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="lastname"style={{marginLeft:8}} className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData.lastname || ''}
                            id="lastname"
                            placeholder="Last Name"
                            readOnly
                          />
                        </div>
                        <div className="col-12"style={{ textAlign: 'left' }}>
                          <label htmlFor="email"style={{marginLeft:8}} className="form-label">Email</label>
                          <div className="input-group">
                            <div className="input-group-text">@</div>
                            <input
                              type="text"
                              className="form-control"
                              value={userData.email || ''}
                              id="email"
                              placeholder="Email"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="phone"style={{marginLeft:8}} className="form-label">Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            value={userData.phone || ''}
                            id="phone"
                            placeholder="Phone"
                            readOnly
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      }
}
