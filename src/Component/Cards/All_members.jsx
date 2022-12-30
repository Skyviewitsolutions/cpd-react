import React from 'react'
import './All_members.css';
import dommy_person from '../../assets/Images/dommy_person.jfif';
const All_members = (props) => {
  return (
    <>
     <div className='row'>
        <div className='col-4 col-md-4 col-lg-3 all_members_box'>
        <div className="member_list">
        <label className="card">
          <input className="card__input" type="checkbox"/>
          <div className="card__body">
            <div className="card__body-cover">
                <img src={dommy_person} alt="#" className="card__body-cover-image" />
                <span className="card__body-cover-checkbox"> 
                <svg className="card__body-cover-checkbox--svg" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg></span>
            </div>
          </div>
        </label>
            
        </div>

        </div>
        <div className='col-8 col-md-8 col-lg-9 all_membersCard'>
          <h4>James<span>(Moderator)</span></h4>
          <h5>Education Detail</h5>
          <h6>MBA Student, Year 1, KHU University</h6>
          <h5>Detail</h5>
          <h6>Skills:Communication PM, Solution Management, Business Development</h6> 

        </div>
       
      </div>
    </>
  )
}

export default All_members
