import Image from "next/image";
import React from "react";
import {
  FaCalendar,
  FaCheck,
  FaClock,
  FaDotCircle,
  FaMapMarker,
  FaPen,
  FaTrash,
} from "react-icons/fa";
import Deletemodal from "./Deletemodal";
import Skeleton from "./skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface eventCardDataProps {
  // state event data types from firestore
  id: number;
  eventName: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  eventImage: string;
  otherDetails: string;
  createdAt: string;
  hostName: string;
  eventType: string;
  hold: string;
  status: string;
}

interface eventCardProps {
  // state event card data types
  event_card_data: eventCardDataProps[];
  deleteModal: boolean;
  closeDeleteModal: () => void;
  handleSelected: (id: any) => void;
  handleDelete: (id: any) => void;
  handleSelectedToUpdate: any;
  loading: boolean;
  doneTask: any;
  // setdoneTask: React.Dispatch<React.SetStateAction<boolean>>;
  markEventDone: (id: any) => void;
  handleCompletedEvent: (id: any) => void;
  markSelected: any;
}

const Eventcard = ({
  event_card_data,
  closeDeleteModal,
  deleteModal,
  handleSelected,
  handleDelete,
  handleSelectedToUpdate,
  loading,
  markEventDone,
  markSelected,
}: eventCardProps) => {
  return (
    <main className="lg:mt-0 mt-3">
      <span className="lg:text-xl text-lg font-semibold text-text_black lg:mt-0 pt-2 dark:text-gray-300">
        All Featured events available here
      </span>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-5">
        {/* loads when data is fetching */}
        {loading ? (
          <Skeleton />
        ) : event_card_data?.length > 0 ? (
          event_card_data?.map((data: eventCardDataProps, index: number) => (
            <div
              className="bg-backgrd dark:bg-gray-900 w-full max-h-full rounded-lg shadow-md pb-5 hover:scale-10 relative"
              key={index}
            >
              <div>
                <Image
                  src={data.eventImage}
                  width={250}
                  height={100}
                  alt="event image"
                  className="h-32 w-[350px] rounded-t-lg"
                />
              </div>
              <div className="flex items-center gap-5 absolute right-4 top-28">
                <div className="hover:scale-90 transition-all duration-300">
                  <span
                    className="flex justify-center items-center w-8 h-8 bg-white dark:bg-bg_black dark:text-gray-300 dark:hover:text-green-500 rounded-full text-gray-400 shadow-md cursor-pointer  tooltip tooltip-bottom"
                    onClick={() => {
                      handleSelectedToUpdate(data);
                    }}
                    data-tip="Edit"
                  >
                    <FaPen />
                  </span>
                </div>
                <div className="hover:scale-90 transition-all duration-300">
                  <span
                    className="flex justify-center items-center w-8 h-8 bg-white  dark:bg-bg_black dark:text-gray-300 dark:hover:text-green-500 rounded-full text-gray-400 shadow-md cursor-pointer hover:scale-100 duration-300 transition-all tooltip tooltip-bottom"
                    onClick={() => handleSelected(data)}
                    data-tip="Delete"
                  >
                    <FaTrash />
                  </span>
                </div>
                <div className="hover:scale-90 transition-all duration-300">
                  <span
                    className="flex justify-center items-center w-8 h-8 bg-white  dark:bg-bg_black dark:text-gray-300 dark:hover:text-green-500 rounded-full text-gray-400 shadow-md cursor-pointer hover:scale-100 duration-300 transition-all tooltip tooltip-bottom"
                    onClick={() => {
                      markSelected(data);
                      markEventDone(data.id);
                    }}
                    data-tip="Mark as done"
                  >
                    <FaCheck />
                  </span>
                </div>
              </div>
              <div className="px-6 mt-5 flex flex-col gap-4">
                <div className=" flex flex-col gap-2">
                  <span
                    className={`${
                      data.status === "active"
                        ? "text-green-400 dark:text-green-500"
                        : data.status === "pending"
                        ? "text-orange-400 dark:text-orange-500"
                        : data.status === "Done"
                        ? "text-green-400  dark:text-green-500"
                        : ""
                    } text-sm`}
                  >
                    {data.status}
                  </span>

                  <span className="text-xl font-semibold text-text_black dark:text-gray-300">
                    {data.eventName}
                  </span>
                  <span className="text-green-400 text-lg flex gap-2 items-center">
                    <FaMapMarker />
                    <span>{data.location}</span>
                  </span>
                  <div className="w-full h-[90px]">
                    <span className="texy-sm text-text_gray font-medium dark:text-gray-300">
                      {/* <FaDotCircle className="text-green-400 " /> */}
                      {data.description}.
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <span>
                      <FaClock />
                    </span>
                    <span>Start:</span>
                    <span>{data.startTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <span>
                      <FaClock />
                    </span>
                    <span>End:</span>
                    <span>{data.endTime}</span>
                  </div>
                </div>
                <div className="text-xs flex justify-between items-center font-semibold dark:text-gray-300 text-text_black">
                  <div>
                    <span>Host: </span>
                    <span>{data.hostName}</span>
                  </div>
                  <div>
                    <span>{`This is a ${data.eventType}`}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-center text-sm flex items-center gap-2 justify-center">
                    <FaDotCircle className="text-green-400" />
                    <span className="dark:text-gray-300">
                      {data.otherDetails}
                    </span>
                  </span>
                  <span className="text-center text-xs font-medium flex  gap-1 justify-center text-orange-300">
                    <FaCalendar />
                    {data.date}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <span className="dark:text-gray-300">No events currently</span>
          </div>
        )}
      </div>
      <Deletemodal // delete selected todo by id
        openModal={deleteModal}
        closeModal={closeDeleteModal}
        handleDelete={() =>
          handleDelete(event_card_data.find((data) => data.id))
        }
        componentText="event"
      />
    </main>
  );
};

export default Eventcard;
// end..
