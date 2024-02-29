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
      closeBtnColor="text-blue-400 border border-border_color"
      maxWidth=""
    >
      <div className="bg-backgrd w-full py-5 rounded-2xl flex items-start pl-3">
        <span className="text-lg font-medium text-text_gray">Add Event</span>
      </div>
      <div className="flex flex-col items-start ml-3 mt-5 gap-4">
        <div className="flex flex-col items-start">
          <label htmlFor="text" className="text-sm text-start font-medium">
            Event title
          </label>
          <input
            type="text"
            className="outline-none border rounded-lg w-[25vw] h-12 pl-3"
            onChange={setEventName}
            placeholder="title: my event"
          />
        </div>
        <div className="mt-3 flex flex-col">
          <label htmlFor="text " className="text-sm text-start font-medium">
            Event date
          </label>
          <div className=" pr-3 pt-3">
            <DatePicker
              onChange={dateChange}
              value={dateValue}
              className={"w-[25vw] h-12 rounded-xl border-transparent"}
              calendarType="iso8601"
            />
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col items-start">
            <label htmlFor="text" className="text-sm">
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
                  "w-[25vw]",
                  "h-[3.2rem]",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col items-start mt-2">
            <label htmlFor="text" className="text-sm ">
              End
            </label>
            <div className="pt-3 pr-3">
              <TimePicker
                // @ts-ignore
                onChange={endTimeChange}
                value={endTimeValue}
                className={"border rounded-lg w-[25vw] h-[3.2rem]"}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <label htmlFor="image" className="text-sm">
              Event image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={setEventImage}
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="text" className="text-sm text-start font-medium">
              Location
            </label>
            <input
              type="text"
              className="outline-none border rounded-lg w-[25vw] h-12 pl-3"
              onChange={setLocationName}
              placeholder="e.g: Belgium"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="text" className="text-sm text-start font-medium">
              Description
            </label>

            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              className="outline-none border rounded-lg w-[25vw] px-4 pt-3"
              onChange={setDescription}
              placeholder="enter description..."
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="text" className="text-sm text-start font-medium">
              Host
            </label>
            <input
              type="text"
              className="outline-none border rounded-lg w-[25vw] h-12 pl-3"
              onChange={setHostName}
              placeholder="hosts"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="text" className="text-sm text-start font-medium">
              How would the event hold?
            </label>

            <div className="flex gap-7 items-center mt-4">
              <div className="flex gap-3 items-center">
                <div
                  className="w-8 h-8 flex justify-center items-center border-2 rounded-full border-border_color "
                  onClick={() => selectedEventType("Virtual event")}
                >
                  <span
                    className={`${
                      eventType === "Virtual event"
                        ? "text-blue-400"
                        : "text-text_black"
                    }`}
                  >
                    <FaDotCircle />
                  </span>
                </div>
                <span>Virtual event</span>
              </div>
              <div className="flex gap-3 items-center">
                <div
                  className="w-8 h-8 flex justify-center items-center border-2 rounded-full border-border_color "
                  onClick={() => selectedEventType("Physical event")}
                >
                  <span
                    className={`${
                      eventType === "Physical event"
                        ? "text-blue-400"
                        : "text-text_black"
                    }`}
                  >
                    <FaDotCircle />
                  </span>
                </div>
                <span>Physical event</span>
              </div>
            </div>
            <div className="flex flex-col items-start mt-4 gap-3">
              <label htmlFor="text" className="text-sm text-start font-medium">
                {"Other details"}
              </label>

              <textarea
                name=""
                id=""
                cols={10}
                rows={5}
                className="outline-none border rounded-lg w-[25vw] px-3  pt-3"
                onChange={setOtherDetails}
                placeholder="Optional"
              />
            </div>
            <div className="flex flex-col items-start mt-4">
              <label htmlFor="text">status</label>
              <select
                className="select select-info w-full max-w-xs border-border_color"
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
              btnStyles={`rounded-lg  py-3 mt-4 border border-border_color`}
              handleClick={handleUpdate}
            />
          ) : (
            <Button
              text={`${loading ? "creating" : "Add event"}`}
              textStyles="text-blue-400"
              btnStyles={`rounded-lg  py-3 mt-4 border border-border_color`}
              handleClick={createEvent}
            />
          )}
          <Button
            text="cancel"
            textStyles="text-black"
            btnStyles={`rounded-lg  py-3 mt-4`}
            handleClick={closeModal}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Eventmodal;