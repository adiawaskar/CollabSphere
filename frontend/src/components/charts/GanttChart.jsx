import React from "react";
import { Chart } from "react-google-charts";

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows = [
  [
    "Planning",
    "Initial planning",
    new Date(2024, 0, 1),
    new Date(2024, 0, 3),
    null,
    100,
    null,
  ],
  [
    "Design",
    "Website design",
    new Date(2024, 0, 4),
    new Date(2024, 0, 10),
    daysToMilliseconds(6),
    80,
    "Planning",
  ],
  [
    "Wireframing",
    "Create wireframes",
    new Date(2024, 0, 10),
    new Date(2024, 0, 12),
    daysToMilliseconds(2),
    100,
    "Design",
  ],
  [
    "Development",
    "Set up development environment",
    new Date(2024, 0, 13),
    new Date(2024, 0, 14),
    daysToMilliseconds(1),
    100,
    "Design",
  ],
  [
    "Frontend",
    "Develop frontend",
    new Date(2024, 0, 15),
    new Date(2024, 1, 1),
    daysToMilliseconds(17),
    60,
    "Wireframing,Development",
  ],
  [
    "Backend",
    "Develop backend",
    new Date(2024, 0, 15),
    new Date(2024, 1, 1),
    daysToMilliseconds(17),
    50,
    "Wireframing,Development",
  ],
  [
    "SEO",
    "SEO optimization",
    new Date(2024, 0, 20),
    new Date(2024, 1, 1),
    daysToMilliseconds(12),
    40,
    "Frontend,Backend",
  ],
  [
    "Content",
    "Create content for the website",
    new Date(2024, 0, 10),
    new Date(2024, 0, 20),
    daysToMilliseconds(10),
    70,
    "Planning",
  ],
  [
    "Testing",
    "Test website functionality",
    new Date(2024, 1, 2),
    new Date(2024, 1, 6),
    daysToMilliseconds(4),
    20,
    "Frontend,Backend",
  ],
  [
    "BugFix",
    "Fix bugs from testing",
    new Date(2024, 1, 7),
    new Date(2024, 1, 9),
    daysToMilliseconds(2),
    0,
    "Testing",
  ],
  [
    "Review",
    "Client review of the site",
    new Date(2024, 1, 10),
    new Date(2024, 1, 12),
    daysToMilliseconds(2),
    0,
    "Testing,Content",
  ],
  [
    "Deployment",
    "Deploy website to production",
    new Date(2024, 1, 13),
    new Date(2024, 1, 14),
    daysToMilliseconds(1),
    0,
    "Review",
  ],
  [
    "Marketing",
    "Launch marketing campaign",
    new Date(2024, 1, 15),
    new Date(2024, 1, 22),
    daysToMilliseconds(7),
    0,
    "Deployment",
  ],
  [
    "Maintenance",
    "Website maintenance and updates",
    new Date(2024, 2, 1),
    new Date(2024, 3, 20),
    daysToMilliseconds(304),
    0,
    "Deployment",
  ],
  [
    "Feedback",
    "Collect feedback and improve",
    new Date(2024, 2, 1),
    new Date(2024, 2, 10),
    daysToMilliseconds(9),
    0,
    "Deployment",
  ],
];

export const data = [columns, ...rows];

// Rename App to GanttChart
const GanttChart = () => {
  return <Chart chartType="Gantt" width="100%" height="100%" data={data} />;
};

// Export GanttChart as the default export
export default GanttChart;