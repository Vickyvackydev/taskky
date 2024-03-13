"use client";
import React, { useState } from "react";
import { maxWidth } from "./width";
import PageHeader from "./pageHeader";
import Eventmodal from "./Eventmodal";
import Eventcard, { eventCardDataProps } from "./Eventcard";
import { auth, db, storage } from "@/firebase/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useFetchFirestoreData } from "@/hooks";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Events = () => {
  const [modal, setModal] = useState(false);
  const [dateValue, dateOnChange] = useState<Value>(new Date());
  const [startValue, startonChange] = useState("10:00");
  const [endValue, endonChange] = useState("6:00");
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [hostName, setHostName] = useState("");
  const [other_details, setOtherDetails] = useState("");
  const [uploadedImage, setUploadedImage]: any = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const eventCollectionRef = collection(db, "events");
  const [selectedEventType, setSelectedEventType] = useState<string | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<eventCardDataProps | any>(
    null
  );
  const [done, setDone] = useState<any>(null);

  const { data: events_data, loading } = useFetchFirestoreData("events");

  const handleSelectEventType = (eventType: string) => {
    setSelectedEventType(eventType);
  };

  const handleImageChange = (e: any) => {
    e.preventDefault();

    setUploadedImage(e.target.files[0]);
  };
  const createEvent = async () => {
    setIsLoading(true);

    try {
      const currentUser = auth?.currentUser;
      if (currentUser) {
        if (
          eventTitle &&
          description &&
          location &&
          hostName &&
          uploadedImage
        ) {
          const eventImageRef = ref(
            storage,
            `event_images/${currentUser?.uid}/${uploadedImage.name}`
          );

          await uploadBytes(eventImageRef, uploadedImage);

          const imageUrl = await getDownloadURL(eventImageRef);

          await addDoc(eventCollectionRef, {
            eventName: eventTitle,
            date: dateValue?.toString(),
            startTime: startValue,
            endTime: endValue,
            description: description,
            location: location,
            eventImage: imageUrl,
            otherDetails: other_details,
            userId: currentUser.uid,
            status: status,
            hostName: hostName,
            eventType: selectedEventType,
            createdAt: serverTimestamp().toString(),
          });
          setModal(false);
        } else {
          console.log("no data available");
        }
      } else {
        console.log("no users authenticated");
      }
    } catch (error) {
      console.log("error creating events", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (id: any) => {
    try {
      const eventDoc = doc(db, "events", id.toString());
      await deleteDoc(eventDoc);

      setDeleteModal(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSelected = (event: any) => {
    setSelectedEvent(event);
    setDeleteModal(true);
  };

  const handleSelectedToUpdate = (event: any) => {
    setSelectedEvent(event);
    setModal(true);
    setDeleteModal(false);
  };

  const handleCompletedEvent = (event: any) => {
    setSelectedEvent(event);
    // setDone((prev) => !prev);
  };

  const handleUpdate = async (id: any) => {
    setIsLoading(true);

    if (id) {
      const currentUser = auth?.currentUser;
      try {
        const updateEventDoc = doc(db, "events", id.toString());

        const eventImageRef = ref(
          storage,
          // @ts-ignore
          `event-images/${currentUser?.uid}/${uploadedImage.name}`
        );
        //  @ts-ignore
        await uploadBytes(eventImageRef, uploadedImage);

        const imageUrl = await getDownloadURL(eventImageRef);

        const newFields = {
          eventName: eventTitle,
          date: dateValue?.toString(),
          startTime: startValue,
          endTime: endValue,
          description: description,
          location: location,
          eventImage: imageUrl,
          otherDetails: other_details,
          status: status,
          hostName: hostName,
          eventType: selectedEventType,

          createdAt: serverTimestamp().toString(),
        };

        await updateDoc(updateEventDoc, newFields);

        setModal(false);
      } catch (error) {
        console.log("error; could not update doc", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("there is no user");
    }
  };

  const markEventDone = async (event_id: any) => {
    try {
      const eventDoc = doc(db, "events", event_id);
      await updateDoc(eventDoc, { status: "Done" });
      console.log("event has being updated");
    } catch (error) {
      console.log("could not update evnt status", error);
    }
  };

  return (
    <div className={maxWidth}>
      <PageHeader
        text="Your events here"
        textStyle="dark:text-gray-300"
        button={true}
        setState={setModal}
        btnText="Add event"
        btnStyle="border-2 border-border_color dark:border-gray-700"
        btnIconStyle="text-blue-400"
        btnTextStyle="text-blue-400"
      />

      <Eventmodal
        openModal={modal}
        closeModal={() => {
          setModal(false);
          setSelectedEvent(null);
        }}
        dateChange={dateOnChange}
        dateValue={dateValue}
        startTimeChange={startonChange}
        endTimeChange={endonChange}
        startTimeValue={startValue}
        endTimeValue={endValue}
        setEventImage={handleImageChange}
        setEventName={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEventTitle(e.target?.value)
        }
        setDescription={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target?.value)
        }
        selectedEventType={handleSelectEventType}
        setHostName={(e: React.ChangeEvent<HTMLInputElement>) =>
          setHostName(e.target?.value)
        }
        setLocationName={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLocation(e.target?.value)
        }
        setOtherDetails={(e: React.ChangeEvent<HTMLInputElement>) =>
          setOtherDetails(e.target?.value)
        }
        createEvent={createEvent}
        loading={loading}
        setStatus={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setStatus(e.target?.value)
        }
        eventType={selectedEventType}
        handleUpdate={() => handleUpdate(selectedEvent?.id)}
        selectedEvent={selectedEvent?.id}
      />
      <Eventcard
        event_card_data={events_data}
        handleSelected={handleSelected}
        deleteModal={deleteModal}
        closeDeleteModal={() => setDeleteModal(false)}
        handleDelete={() => handleDeleteEvent(selectedEvent?.id)}
        handleSelectedToUpdate={handleSelectedToUpdate}
        loading={loading}
        doneTask={done}
        handleCompletedEvent={() => handleCompletedEvent(selectedEvent?.id)}
        markEventDone={() => markEventDone(selectedEvent?.id)}
      />
    </div>
  );
};

export default Events;
