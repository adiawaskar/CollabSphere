import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useAuth } from '../context/AuthContext';

const VideoConference = () => {
  const { sessionId } = useParams();
  const { email } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Replace with your JAAS API credentials
  const JAAS_APP_ID = 'vpaas-magic-cookie-aa7c4797e7124040843a270d0dd36e82';
  const JAAS_DOMAIN = 'meet.jit.si'; // or your custom domain if using enterprise

  useEffect(() => {
    document.title = "Video Conference | CollabSphere";
    return () => {
      document.title = "CollabSphere";
    };
  }, []);

  const handleReadyToClose = () => {
    console.log("Meeting closed");
  };

  const handleJitsiIFrameRef = (iframeRef) => {
    iframeRef.style.height = '100%';
    iframeRef.style.width = '100%';
  };

  const configOverwrite = {
    startWithAudioMuted: true,
    disableModeratorIndicator: true,
    startScreenSharing: false,
    enableEmailInStats: false,
  };

  const interfaceConfigOverwrite = {
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    MOBILE_APP_PROMO: false,
  };

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-white">
      <JitsiMeeting
        domain={JAAS_DOMAIN}
        appId={JAAS_APP_ID}
        roomName={`collabsphere-${sessionId}`}
        configOverwrite={configOverwrite}
        interfaceConfigOverwrite={interfaceConfigOverwrite}
        userInfo={{
          displayName: email?.split('@')[0] || 'User',
          email: email
        }}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={handleJitsiIFrameRef}
        spinner={Loader}
      />
    </div>
  );
};

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-900"></div>
  </div>
);

export default VideoConference; 