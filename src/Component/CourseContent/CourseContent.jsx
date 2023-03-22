// here we creating a part for the accordian which will shown here;

import React from "react";
import "./courseContent.css";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
import { useState } from "react";

const CourseContent = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  return (
    <Accordion>
      {data.map((item, index) => {

        return (
          <>
            <AccordionItem key={index}>
              <AccordionHeader>
                <div className="accordianTitleCont" key={index}>
                  <div>
                    <IoIosArrowDown color="var(--black)" />
                    <h6>Up and Running with python</h6>
                  </div>
                  <span>2 Lectures : 6 min</span>
                </div>
              </AccordionHeader>

              <AccordionBody>
                <div className="accordion-body">
                  <div className="accordianBodyPart">
                    <div className="accordianBodyleft">
                      <AiOutlineYoutube size={16} color="var(--black)" />
                      <h6>Installing Python</h6>
                    </div>
                  </div>
                  <span>23 min</span>
                </div>
                <div className="accordion-body">
                  <div className="accordianBodyPart">
                    <div className="accordianBodyleft">
                      <AiOutlineYoutube size={16} color="var(--black)" />
                      <h6>Installing Python</h6>
                    </div>
                  </div>
                  <span>23 min</span>
                </div>
              </AccordionBody>
            </AccordionItem>
          </>
        );
      })}
      <AccordionItem>
        <AccordionHeader>
          <div className="accordianTitleCont">
            <div>
              <IoIosArrowDown color="var(--black)" />
              <h6>Up and Running with python</h6>
            </div>
            <span>2 Lectures : 6 min</span>
          </div>
        </AccordionHeader>

        <AccordionBody>
          <div className="accordion-body">
            <div className="accordianBodyPart">
              <div className="accordianBodyleft">
                <AiOutlineYoutube size={16} color="var(--black)" />
                <h6>Installing Python</h6>
              </div>
            </div>
            <span>23 min</span>
          </div>
          <div className="accordion-body">
            <div className="accordianBodyPart">
              <div className="accordianBodyleft">
                <AiOutlineYoutube size={16} color="var(--black)" />
                <h6>Installing Python</h6>
              </div>
            </div>
            <span>23 min</span>
          </div>
        </AccordionBody>
      </AccordionItem>

      <AccordionItem>
        <AccordionHeader>
          <div className="accordianTitleCont">
            <div>
              <IoIosArrowDown color="var(--black)" />
              <h6>Up and Running with python</h6>
            </div>
            <span>2 Lectures : 6 min</span>
          </div>
        </AccordionHeader>

        <AccordionBody>
          <div className="accordion-body">Lorem ipsum dolor sit amet.</div>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseContent;
