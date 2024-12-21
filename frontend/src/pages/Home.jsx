import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { toast } from "react-toastify";

const Home = () => {
  const { email } = useAuth();
  const [myProjects, setMyProjects] = useState([]);
  const [collaborativeProjects, setCollaborativeProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
    collaborators: [],
  });
  const [isJoinProjectModalOpen, setIsJoinProjectModalOpen] = useState(false);
  const [joinProjectCode, setJoinProjectCode] = useState("");
  const [teamCode, setTeamCode] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([
    { id: 1, name: "User A" },
    { id: 2, name: "User B" },
    { id: 3, name: "User C" },
    { id: 4, name: "User D" },
  ]);

  useEffect(() => {
    document.title = "Home | CollabSphere";
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const myProjectsResponse = await fetch(
          `http://localhost:3000/api/projects/personal/${email}`
        );
        if (!myProjectsResponse.ok) {
          throw new Error(`HTTP error! status: ${myProjectsResponse.status}`);
        }
        const myProjectsData = await myProjectsResponse.json();
        setMyProjects(myProjectsData);

        const collaborativeProjectsResponse = await fetch(
          `http://localhost:3000/api/projects/collaborated/${email}`
        );
        if (!collaborativeProjectsResponse.ok) {
          throw new Error(
            `HTTP error! status: ${collaborativeProjectsResponse.status}`
          );
        }
        const collaborativeProjectsData =
          await collaborativeProjectsResponse.json();
        setCollaborativeProjects(collaborativeProjectsData);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Failed to fetch projects");
        toast.error(err.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchProjects();
    }

    return () => {
      document.title = "Vite + React";
    };
  }, [email]);

  const handleOpenNewProjectModal = () => {
    setIsNewProjectModalOpen(true);
  };

  const handleCloseNewProjectModal = () => {
    setIsNewProjectModalOpen(false);
    setNewProjectData({ name: "", description: "", collaborators: [] });
  };

  const handleNewProjectInputChange = (e) => {
    setNewProjectData({ ...newProjectData, [e.target.name]: e.target.value });
  };

  const handleAddCollaborator = (userId) => {
    if (!newProjectData.collaborators.includes(userId)) {
      setNewProjectData({
        ...newProjectData,
        collaborators: [...newProjectData.collaborators, userId],
      });
    }
  };

  const handleRemoveCollaborator = (userId) => {
    setNewProjectData({
      ...newProjectData,
      collaborators: newProjectData.collaborators.filter((id) => id !== userId),
    });
  };

  const handleCreateNewProject = async () => {
    try {
      const { name, description, collaborators } = newProjectData;

      const response = await fetch("http://localhost:3000/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          leader_email: email,
          team_members: collaborators,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create project");
      }

      const data = await response.json();
      console.log("Project created:", data);
      toast.success("Project created successfully!");
      setTeamCode(data.team_id);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(
        error.message || "An error occurred while creating the project."
      );
    }
  };

  const handleOpenJoinProjectModal = () => {
    setIsJoinProjectModalOpen(true);
  };

  const handleCloseJoinProjectModal = () => {
    setIsJoinProjectModalOpen(false);
    setJoinProjectCode("");
  };

  const handleJoinProjectInputChange = (e) => {
    setJoinProjectCode(e.target.value);
  };

  const handleJoinProject = async () => {
    try {
      if (!joinProjectCode) {
        toast.error("Please enter a project code.");
        return;
      }
      const response = await fetch(`http://localhost:3000/api/projects/join/${joinProjectCode}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ member_email: email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to join project");
      }

      toast.success("Successfully joined the project!");
      handleCloseJoinProjectModal();
    } catch (error) {
      console.error("Error joining project:", error);
      toast.error(
        error.message || "An error occurred while joining the project."
      );
    }
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="w-screen min-h-screen overflow-x-hidden"
      style={{
        backgroundImage: "url(/home_bg.avif)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full h-screen flex justify-center items-center text-purple-900 text-center z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to CollabSphere{" "}
          </h1>
          {" "}
          <p className="text-lg md:text-2xl">Collaborate, Manage, and Succeed Together{" "}
          </p>
          <div className="flex justify-center mt-8">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 shadow-sm"
              onClick={handleOpenNewProjectModal}
            >
              Start a new Project
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm"
              onClick={handleOpenJoinProjectModal}
            >
              Join an Existing Project
            </button>
          </div>
        </div>
      </div>

      {isNewProjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              className="border p-2 mb-2 w-full"
              onChange={handleNewProjectInputChange}
              value={newProjectData.name}
            />
            <textarea
              name="description"
              placeholder="Project Description"
              className="border p-2 mb-4 w-full h-24"
              onChange={handleNewProjectInputChange}
              value={newProjectData.description}
            />
            <div>
              <p className="font-semibold">Add Collaborators</p>
              <div className="flex flex-wrap">
                {availableUsers.map((user) => (
                  <button
                    key={user.id}
                    className={`m-1 px-2 py-1 rounded-full text-sm ${
                      newProjectData.collaborators.includes(user.email)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => {
                      newProjectData.collaborators.includes(user.email)
                        ? handleRemoveCollaborator(user.email)
                        : handleAddCollaborator(user.email);
                    }}
                  >
                    {user.name}
                  </button>
                ))}
              </div>
            </div>
            {teamCode && (
              <div className="mt-4">
                <p className="font-bold">Share this Team Code:</p>
                <p className="text-lg bg-gray-100 p-2 rounded">{teamCode}</p>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2"
                onClick={handleCloseNewProjectModal}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                onClick={handleCreateNewProject}
              >
                {teamCode ? "Close" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isJoinProjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Join a Project</h2>
            <input
              type="text"
              placeholder="Enter Project Code"
              className="border p-2 mb-4 w-full"
              value={joinProjectCode}
              onChange={handleJoinProjectInputChange}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2"
                onClick={handleCloseJoinProjectModal}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                onClick={handleJoinProject}
              >
                Join Project
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 px-4 text-center relative z-20">
        <h2 className="text-6xl text-purple-900 font-extrabold mb-8 leading-tight">
          My Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myProjects.map((project, index) => (
            <Card key={index} project={project} />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 text-center relative z-20">
        <h2 className="text-6xl text-purple-900 font-extrabold mb-8 leading-tight">
          Collaborative Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {collaborativeProjects.map((project, index) => (
            <Card key={index} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;