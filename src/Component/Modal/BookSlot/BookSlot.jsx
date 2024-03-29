import React, { useState } from "react";
import "./BookSlot.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../fonts/Inter-Bold.ttf";

const BookSlot = (props) => {
  return (
    <>
      <div className="bookSlotModalWrapper">
        {/* <div className="modal" id="myModal">

  <div className="modal-dialog modal-lg">
    <div className="modal-content">

    
      <div className="modal-header">
        <h4  className="modal-title"> Detail of Your Slot Booking</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>

   
      <div className="modal-body">
         <div className="slot-booking-data">
            <div className="row">
                <div className="col-lg-6 border-right">
                    <table>
                       
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width:100px ;margin-left: 3px; padding-top: 10px;margin-bottom: 10px; "><div className="date1" > Date: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"> <div className="date" > 25-11-2022 </div> </td>
                        </tr>
                   
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px ; padding-top: 10px"><div className="date1" >Coach: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"><div className="date" >James Adan  </div></td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" > Status: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"><div className="date" >Attendent </div></td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" > Action: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"><div className="date" >Bang kok </div></td>
                        </tr>
                    </table>
                </div>

                <div className="col-lg-6">
                    <table>
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" > Time: </div></td>

                            <td className="hight" style="text-align: right;  margin-bottom: 20px;    border-bottom: 1px solid #cccc"><div className="date" > 25-11-2022 </div></td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" >Location:</div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"> <div className="date" >Bang kok </div></td>
                        </tr> 
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" > Report: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc">Done:</td>
                        </tr>
                       
                    </table>
                    <div className="row">
                        <div className="col-lg-2"> 
                            <div className="date2" > Status:</div>
                        </div>

                        <div className="button">
                            <button> Waiting for confirmation</button>
                        </div>
                    </div>
                    
                </div>
            </div>
         </div>
      </div>
      </div>
    </div>
  </div> */}

        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <div className="bookSlotModalHeading">
              <Modal.Title id="contained-modal-title-vcenter">
                <h5> Detail of Your Slot Booking</h5>
              </Modal.Title>
            </div>
          </Modal.Header>
          <div className="bookslotmodalbody">
            <Modal.Body>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-between">
                  <Table>
                    <tbody className="bookslottablerow">
                      <tr>
                        <td className="startCol">Date</td>
                        <td className="text-end">2023-01-11</td>
                      </tr>
                      <tr>
                        <td className="startCol">Coach</td>
                        <td className="text-end">James Adan</td>
                      </tr>
                      <tr>
                        <td className="startCol">Status</td>
                        <td className="text-end">Attandent</td>
                      </tr>
                      <tr>
                        <td className="startCol">Actions</td>

                        <td className="text-end">Bang Kok</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="col-lg-6 col-md-6 col-12 ">
                  <Table>
                    <tbody className="bookslottablerow">
                      <tr>
                        <td className="startCol">Time</td>
                        <td className="text-end">18:15-19:15</td>
                      </tr>
                      <tr>
                        <td className="startCol">Location</td>
                        <td className="text-end">Bang Kok</td>
                      </tr>
                      <tr>
                        <td className="startCol">Report</td>
                        <td className="text-end">Done</td>
                      </tr>
                      <tr>
                        <td className="startCol">Status</td>

                        <td className="text-end">
                          {" "}
                          <button className="bookslotbutton"> Waiting for confirmation</button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              {/* <div className="slot-booking-data">
            <div className="row">
                <div className="col-lg-6 border-right">
                    <Table>
                       <tbody>
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width:100px ;margin-left: 3px; padding-top: 10px;margin-bottom: 10px; "><div className="date1" > Date: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"> <div className="date" > 25-11-2022 </div> </td>
                        </tr>
                   
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px ; padding-top: 10px"><div className="date1" >Coach: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"><div className="date" >James Adan  </div></td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" > Status: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"><div className="date" >Attendent </div></td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" > Action: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"><div className="date" >Bang kok </div></td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                <div className="col-lg-6">
                    <table>
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" > Time: </div></td>

                            <td className="hight" style="text-align: right;  margin-bottom: 20px;    border-bottom: 1px solid #cccc"><div className="date" > 25-11-2022 </div></td>
                        </tr>
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" >Location:</div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc"> <div className="date" >Bang kok </div></td>
                        </tr> 
                        <tr>
                            <td style="border-bottom: 1px solid #cccc ; width: 280px; padding-top: 10px"><div className="date1" > Report: </div></td>
                            <td style="text-align: right;  border-bottom: 1px solid #cccc">Done:</td>
                        </tr>
                       
                    </table>
                    <div className="row">
                        <div className="col-lg-2"> 
                            <div className="date2" > Status:</div>
                        </div>

                        <div className="button">
                            <button> Waiting for confirmation</button>
                        </div>
                    </div>
                    
                </div>
            </div>
         </div>  */}
            </Modal.Body>
          </div>
          {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
        </Modal>
      </div>
    </>
  );
};

export default BookSlot;
