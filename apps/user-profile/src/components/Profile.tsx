import React, { useState } from "react";
import "./Profile.css";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  address: string;
  phone: string;
}

const MOCK_PROFILE: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  address: "123 Main St, Anytown, ST 12345",
  phone: "(555) 123-4567",
};

const Profile: React.FC = () => {
  const [profile] = useState<UserProfile>(MOCK_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-avatar">
          <img src={profile.avatar} alt={profile.name} />
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <label>Name</label>
            {isEditing ? (
              <input type="text" defaultValue={profile.name} />
            ) : (
              <span>{profile.name}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Email</label>
            {isEditing ? (
              <input type="email" defaultValue={profile.email} />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Address</label>
            {isEditing ? (
              <textarea defaultValue={profile.address} />
            ) : (
              <span>{profile.address}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Phone</label>
            {isEditing ? (
              <input type="tel" defaultValue={profile.phone} />
            ) : (
              <span>{profile.phone}</span>
            )}
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button
                  className="btn-save"
                  onClick={() => setIsEditing(false)}
                >
                  Save Changes
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
