import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const VideoConference = ({ projectName }) => {
  const navigate = useNavigate();
  const { email } = useAuth();
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);

  const startNewMeeting = async () => {
    try {
      setIsCreatingMeeting(true);
      const response = await fetch('/api/video-conference/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: projectName,
          participants: [email]
        }),
      });

      if (!response.ok) throw new Error('Failed to create meeting');

      const { sessionId } = await response.json();
      navigate(`/video-conference/${sessionId}`);
    } catch (error) {
      console.error('Error starting meeting:', error);
      toast.error('Failed to start meeting');
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Video Conference</h2>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <button
              onClick={startNewMeeting}
              disabled={isCreatingMeeting}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 
                       transition-colors duration-200 disabled:opacity-50"
            >
              {isCreatingMeeting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Meeting...
                </span>
              ) : (
                'Start New Meeting'
              )}
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Meeting Guidelines:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ensure your camera and microphone are working before joining</li>
              <li>Use headphones to prevent echo</li>
              <li>Find a quiet place for better communication</li>
              <li>Use the chat feature for sharing links and notes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;