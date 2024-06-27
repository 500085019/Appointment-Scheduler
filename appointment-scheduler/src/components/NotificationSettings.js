// NotificationSettings.js
import React, { useState } from 'react';

const NotificationSettings = () => {
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const handleSmsToggle = () => {
    setSmsEnabled(!smsEnabled);
    // Logic to update notification settings on backend
  };

  const handleEmailToggle = () => {
    setEmailEnabled(!emailEnabled);
    // Logic to update notification settings on backend
  };

  return (
    <div>
      <h2>Notification Settings</h2>
      <label>
        <input type="checkbox" checked={smsEnabled} onChange={handleSmsToggle} />
        Receive SMS Notifications
      </label>
      <br />
      <label>
        <input type="checkbox" checked={emailEnabled} onChange={handleEmailToggle} />
        Receive Email Notifications
      </label>
    </div>
  );
};

export default NotificationSettings;
 
 
 
