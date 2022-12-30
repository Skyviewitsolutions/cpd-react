import React from 'react'
import './All_members_selected.css';
import dommy_person from '../../assets/Images/dommy_person.jfif';

const All_members_selected = () => {
  return (
    <>
      <div className='row mb-4'>
        <div className='col-4 col-md-4 col-lg-2'>
        <div className="custom-control custom-checkbox image-checkbox all_selectedmembers_box">
            
            <label class="custom-control-label" for="ck1a">
                <img src={dommy_person} alt="#" class="img-fluid" />
            </label>
                       <input type="checkbox" class="custom-control-input" id="ck1a" />
            
        </div>

        </div>
        <div className='col-8 col-md-8 col-lg-4 all_selectedmembersCard'>
<h4>James</h4>
<span>(Moderator)</span>
<h5>Education Detail</h5>
<h6>MBA Student, Year 1, KHU University</h6>

        </div>
       <div className='col-8 col-md-8 col-lg-6 all_selectedmembersCard'>
       <h5>Detail</h5>
<h6>Skills : Communication PM, Solution Management, Business Development</h6> 

       </div>



      </div>

      
    </>
  )
}

export default All_members_selected
