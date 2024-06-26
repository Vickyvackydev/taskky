"use client";
import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { FaCalendarDay, FaCheck, FaClock, FaDotCircle } from "react-icons/fa";
import Button from "./Button";
import moment from "moment";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

interface EventProps {
  // state the eventmodal params types
  openModal: boolean;
  closeModal: () => void;
  createEvent: () => void;
  startTimeChange: (e: any) => void;
  endTimeChange: (e: any) => void;
  startTimeValue: string;
  endTimeValue: string;
  dateValue: string | any;
  dateChange: (value: any) => void;
  setEventName: (value: any) => void;
  setEventImage: (value: any) => void;
  setLocationName: (value: any) => void;
  setDescription: (value: any) => void;
  setHostName: (value: any) => void;
  selectedEventType: any;
  setOtherDetails: (value: any) => void;
  loading: boolean;
  setStatus: (e: any) => void;
  eventType: string | null;
  handleUpdate: (id: any) => void;
  selectedEvent: any;
}

const Eventmodal = ({
  openModal,
  closeModal,
  setEventName,
  setEventImage,
  setDescription,
  setHostName,
  setOtherDetails,
  setLocationName,
  startTimeChange,
  endTimeChange,
  setStatus,
  startTimeValue,
  endTimeValue,
  dateChange,
  dateValue,
  selectedEventType,
  createEvent,
  loading,
  eventType,
  handleUpdate,
  selectedEvent,
}: EventProps) => {
  return (
    <Modal
      isOpen={openModal}
      isClose={closeModal}
      closeBtnColor="text-blue-400 border border-border_color dark:border-gray-700"
      maxWidth=""
    >
      <div className="bg-backgrd dark:bg-gray-900 w-full lg:py-5 py-3 rounded-2xl flex items-start pl-3">
        <span className="lg:text-lg text-sm font-medium text-text_gray dark:text-gray-300">
          Add Event
        </span>
      </div>
      <div className="flex flex-col items-start ml-3 mt-5 gap-4">
        <div className="flex flex-col items-start gap-3">
          <label
            htmlFor="text"
            className="lg:text-sm text-xs text-start font-medium dark:text-gray-300"
          >
            Event title
          </label>
          <input
            type="text"
            className="outline-none border rounded-lg lg:w-[25vw] w-[80vw] h-12 pl-3 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 placeholder:lg:text-xs placeholder:text-sm lg:text-sm text-xs"
            onChange={setEventName}
            placeholder="title: my event"
          />
        </div>
        <div className="mt-3 flex flex-col">
          <label
            htmlFor="text "
            className="lg:text-sm text-xs text-start font-medium dark:text-gray-300"
          >
            Event date
          </label>
          <div className=" pr-3 pt-3">
            <DatePicker
              onChange={dateChange}
              value={dateValue}
              className={
                "lg:w-[25vw] w-[80vw] h-12 rounded-xl  dark:bg-gray-900  dark:text-gray-300 lg:text-sm text-xs"
              }
              calendarType="iso8601"
            />
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col items-start">
            <label
              htmlFor="text"
              className=" dark:text-gray-300 lg:text-sm text-xs"
            >
              Start
            </label>
            <div className=" h-12 flex justify-between pt-3 pr-3">
              <TimePicker
                // @ts-ignore
                onChange={startTimeChange}
                value={startTimeValue}
                className={[
                  "border-opacity-5",
                  "border-collapse",
                  "rounded-t-lg",
                  "lg:w-[25vw] w-[80vw]",
                  "h-[3.2rem]",
                  "dark:text-gray-300 lg:text-sm text-xs",
                  "dark:bg-gray-900",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col items-start mt-2">
            <label
              htmlFor="text"
              className=" dark:text-gray-300 lg:text-sm text-xs"
            >
              End
            </label>
            <div className="pt-3 pr-3">
              <TimePicker
                // @ts-ignore
                onChange={endTimeChange}
                value={endTimeValue}
                className={
                  " rounded-lg lg:w-[25vw] lg:text-sm text-xs w-[80vw] h-[3.2rem] dark:text-gray-300 dark:bg-gray-900"
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <label
              htmlFor="image"
              className="lg:text-sm text-xs dark:text-gray-300"
            >
              Event image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 lg:text-sm text-xs"
              onChange={setEventImage}
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <label
              htmlFor="text"
              className="lg:text-sm text-xs text-start font-medium dark:text-gray-300"
            >
              Location
            </label>
            <input
              type="text"
              className="outline-none border rounded-lg lg:w-[25vw] w-[80vw] h-12 pl-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 placeholder:lg:text-sm placeholder:text-xs lg:text-sm text-xs"
              onChange={setLocationName}
              placeholder="e.g: Belgium"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <label
              htmlFor="text"
              className="lg:text-sm text-xs text-start font-medium dark:text-gray-300"
            >
              Description
            </label>

            <textarea
              name=""
              id=""
              cols={5}
              rows={10}
              className="outline-none border rounded-lg lg:w-[25vw] w-[80vw] px-4 pt-3 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-900 placeholder:lg:text-sm placeholder:text-xs lg:text-sm text-xs"
              onChange={setDescription}
              placeholder="enter description...: min of 20 words"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <label
              htmlFor="text"
              className="lg:text-sm text-xs text-start font-medium dark:text-gray-300"
            >
              Host
            </label>
            <input
              type="text"
              className="outline-none border rounded-lg lg:w-[25vw] w-[80vw] h-12 pl-3 dark:text-gray-300 dark:border-gray-700 dark:bg-gray-900 placeholder:lg:text-sm placeholder:text-xs lg:text-sm text-xs"
              onChange={setHostName}
              placeholder="hosts"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <label
              htmlFor="text"
              className="lg:text-sm text-xs text-start font-medium dark:text-gray-300"
            >
              How would the event hold?
            </label>

            <div className="flex gap-7 items-center mt-4">
              <div className="flex gap-3 items-center">
                <div
                  className="lg:w-8 w-5 lg:h-8 h-5 flex justify-center items-center border-2 rounded-full border-border_color dark:border-gray-700 lg:text-lg text-xs"
                  onClick={() => selectedEventType("Virtual event")}
                >
                  <span
                    className={`${
                      eventType === "Virtual event"
                        ? "text-blue-400"
                        : "text-text_black dark:text-gray-700"
                    } lg:text-sm text-xs `}
                  >
                    <FaDotCircle />
                  </span>
                </div>
                <span className="dark:text-gray-300 lg:text-sm text-xs">
                  Virtual event
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <div
                  className="lg:w-8 w-5 lg:h-8 h-5  flex justify-center items-center border-2 rounded-full border-border_color dark:border-gray-700 "
                  onClick={() => selectedEventType("Physical event")}
                >
                  <span
                    className={`${
                      eventType === "Physical event"
                        ? "text-blue-400"
                        : "text-text_black dark:text-gray-700"
                    } lg:text-sm text-xs `}
                  >
                    <FaDotCircle />
                  </span>
                </div>
                <span className="dark:text-gray-300 lg:text-sm text-xs">
                  Physical event
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start mt-4 gap-3">
              <label
                htmlFor="text"
                className="lg:text-sm text-xs text-start font-medium dark:text-gray-300"
              >
                {"Other details"}
              </label>

              <textarea
                name=""
                id=""
                cols={10}
                rows={5}
                className="outline-none border rounded-lg lg:w-[25vw] w-[80vw] px-3  pt-3 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-700 placeholder:lg:text-sm placeholder:text-xs lg:text-sm text-xs"
                onChange={setOtherDetails}
                placeholder="Optional"
              />
            </div>
            <div className="flex flex-col items-start mt-4">
              <label htmlFor="text">status</label>
              <select
                className="select select-info w-full max-w-xs border-border_color dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                onChange={setStatus}
              >
                <option disabled selected>
                  Select status
                </option>
                <option>active</option>
                <option>pending</option>
                <option>canceled</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex ">
          {selectedEvent ? (
            <Button
              text={`${loading ? "updating" : "Update event"}`}
              textStyles="text-blue-400"
              btnStyles={`rounded-lg  py-3 mt-4 border border-border_color dark:border-gray-700`}
              handleClick={handleUpdate}
            />
          ) : (
            <Button
              text={`${loading ? "creating" : "Add event"}`}
              textStyles="text-blue-400"
              btnStyles={`rounded-lg  py-3 mt-4 border border-border_color dark:border-gray-700 lg:text-lg text-sm`}
              handleClick={createEvent}
            />
          )}
          <Button
            text="cancel"
            textStyles="text-black dark:text-gray-300"
            btnStyles={`rounded-lg  py-3 mt-4 lg:text-lg text-sm`}
            handleClick={closeModal}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Eventmodal;
// end..
