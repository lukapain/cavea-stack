
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FieldValues,  useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

export default function CreateList() {
 
  const [inptData,setInptData] = useState({})
  {/**ეს არის useForm რომლითაც შეგვიძლია მარტივად გავაკეთოთ ვალიდაციები. */}
  const { register, handleSubmit, formState: { errors } } = useForm();
  {/**ეს კი გვეხმარება დავბრუნდეთ როუტზე */}
  const navigate = useNavigate();
{/**ვაგზავნი პოსტ რექვესტს backend-ში და ვბრუნდები home როუტზე */}
const onSubmit = async (data: FieldValues) => {
  setInptData(data);
  try {
    const response = await fetch('http://localhost:8080/Inventories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log(responseData);
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
 console.log(inptData);
 
  
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <div className="container">
            <div className="card" style={{"textAlign":"left"}}>
              <div className="card-title">
                <h2>ახალი ინვენტარის შექმნა</h2>
              </div>
              <div className="card-body">
                <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>ადგილმდებარეობა:</label>
                    <select className="form-control" id="exampleSelect1" {...register("location", { required: true })}>
                      <option>მთავარი ოფისი</option>
                      <option>კავეა გალერია</option>
                      <option>კავეა თბილისი მოლი</option>
                      <option>კავეა ისთ ფოინთი</option>
                      <option>კავეა სითი მოლი</option>
                    </select>
                  </div>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-lg-12">
                      <div className={`form-group ${errors.name ? "is-invalid" : ""} `}>
                        <label htmlFor="">სახელი</label>
                        <input type="text" className="form-control"  {...register("name", { required: true })}/>
                        {errors.name && <div className="text-danger">შეიყვანეთ სახელი</div>}
                      </div>
                    </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="">ფასი</label>
                      <input type="number" className="form-control"  {...register("price", { required: true })}/>
                      {errors.price && <div className="text-danger">ჩაწერეთ რიცხვი</div>}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group mt-4">
                      <button className="btn btn-success" type="submit">
                        დამატება
                      </button>
                      
                      <Link to={"/"} className="btn btn-danger">
                        Back
                      </Link>
                      
                    </div>
      
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
