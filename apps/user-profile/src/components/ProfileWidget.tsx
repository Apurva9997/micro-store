import React from "react";
import "./ProfileWidget.css";

interface ProfileWidgetProps {
  onNavigateToProfile: () => void;
}

const ProfileWidget: React.FC<ProfileWidgetProps> = ({
  onNavigateToProfile,
}) => {
  return (
    <div className="profile-widget" onClick={onNavigateToProfile}>
      <div className="profile-icon">👤</div>
    </div>
  );
};

export default ProfileWidget;
