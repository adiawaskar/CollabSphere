import React, { useCallback } from "react";
import {
  MdTimeline,
  MdStackedBarChart,
  MdShowChart,
  MdVideoCall,
  MdInsertDriveFile,
  MdChat,
} from "react-icons/md";
import { BsKanbanFill } from "react-icons/bs";

const Feature = ({ name, Icon, onClick, isSelected }) => (
  <button
    className={`flex items-center w-full p-3 rounded-md transition-colors duration-200 ${
      isSelected ? "bg-blue-500 text-white font-medium" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <Icon className="text-xl mr-2" />
    <span className="font-medium">{name}</span>
  </button>
);

const EventBar = ({ projectName, setFeature, selectedFeature }) => {
  const features = [
    { name: "Kanban Board", Icon: BsKanbanFill },
    { name: "Gantt Chart", Icon: MdTimeline },
    { name: "Burn Down Chart", Icon: MdStackedBarChart },
    { name: "Burn Up Chart", Icon: MdShowChart },
    { name: "Video Conference", Icon: MdVideoCall },
    { name: "Shared Document", Icon: MdInsertDriveFile },
    { name: "Team Chat", Icon: MdChat },
  ];

  const handleFeatureClick = useCallback(
    (name) => {
      setFeature(name);
    },
    [setFeature]
  );

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="mb-4">
        {projectName ? (
          <h1 className="text-lg font-semibold text-center">{projectName}</h1>
        ) : (
          <h1 className="text-lg font-semibold text-center">Loading...</h1>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {features.map((feature) => (
          <Feature
            key={feature.name}
            name={feature.name}
            Icon={feature.Icon}
            onClick={() => handleFeatureClick(feature.name)}
            isSelected={selectedFeature === feature.name}
          />
        ))}
      </div>
    </div>
  );
};

export default EventBar;