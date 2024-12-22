import "./Dashboard.css";
import "../components/event.css";
import "../components/task.css";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventBar from "../components/EventBar";
import TaskBox from "../components/TaskBox";
import GanttChart from "../components/charts/GanttChart";
import BurnDownChart from "../components/charts/BurnDownChart";
import BurnUpChart from "../components/charts/BurnUpChart";
import VideoConference from "../components/charts/VideoConference";
import SharedDocument from "../components/charts/SharedDocument";
import TeamChat from "../components/charts/TeamChat";

function Dashboard() {
  const { projectName } = useParams();
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    document.title = `${projectName} | CollabSphere`;
    return () => {
      document.title = "Vite + React";
    };
  }, [projectName]);

  const renderFeature = () => {
    switch (selectedFeature) {
      case "Kanban Board":
        return (
          <TaskBox
            projectName={projectName}
            events={events}
            setEvents={setEvents}
            currentEvent={currentEvent}
            setCurrentEvent={setCurrentEvent}
          />
        );
      case "Gantt Chart":
        return <GanttChart />;
      case "Burn Down Chart":
        return <BurnDownChart />;
      case "Burn Up Chart":
        return <BurnUpChart />;
      case "Video Conference":
        return <VideoConference />;
      case "Shared Document":
        return <SharedDocument />;
      case "Team Chat":
        return <TeamChat />;
      default:
        return (
          <TaskBox
            projectName={projectName}
            events={events}
            setEvents={setEvents}
            currentEvent={currentEvent}
            setCurrentEvent={setCurrentEvent}
          />
        );
    }
  };

  const initEvent = useMemo(
    () => [
      {
        title: "Add a new Event",
        ["To do"]: [],
        ["In progress"]: [],
        ["Completed"]: [],
      },
    ],
    []
  );

  const [events, setEvents] = useState(() => {
    return localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : initEvent;
  });

  const [currentEvent, setCurrentEvent] = useState(events[0]);

  const updateEvents = useCallback(async () => {
    try {
      if (!events.length) {
        await localStorage.setItem("events", JSON.stringify(initEvent));
        setEvents(JSON.parse(localStorage.getItem("events")));
      } else {
        await localStorage.setItem("events", JSON.stringify(events));
      }
    } catch (e) {
      console.error("Failed to modify events!");
    }
  }, [events]);

  useEffect(() => {
    updateEvents();
  }, [events]);

  return (
    <div className="App mt-14 flex h-screen">
      <EventBar
        projectName={projectName}
        selectedFeature={selectedFeature}
        setFeature={setSelectedFeature} // Pass the setter function
      />
      <div className="flex-grow mt-12 overflow-y-auto">
        {renderFeature()}
      </div>
    </div>
  );
}

export default Dashboard;