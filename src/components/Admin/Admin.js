// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({
    advertiser: '',
    videoPath: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    const response = await axios.get('/api/ads');
    setAds(response.data);
  };

  const handleAddAd = async () => {
    await axios.post('/api/ads', newAd);
    fetchAds(); // Refresh the ad list
  };

  return (
    <div className="admin-dashboard">
      <h1>Ad Management Dashboard</h1>
      
      <div className="new-ad-form">
        <h2>Add New Ad</h2>
        <input
          type="text"
          placeholder="Advertiser"
          value={newAd.advertiser}
          onChange={(e) => setNewAd({ ...newAd, advertiser: e.target.value })}
        />
        <input
          type="text"
          placeholder="Video Path"
          value={newAd.videoPath}
          onChange={(e) => setNewAd({ ...newAd, videoPath: e.target.value })}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={newAd.startDate}
          onChange={(e) => setNewAd({ ...newAd, startDate: e.target.value })}
        />
        <input
          type="date"
          placeholder="End Date"
          value={newAd.endDate}
          onChange={(e) => setNewAd({ ...newAd, endDate: e.target.value })}
        />
        <button onClick={handleAddAd}>Add Ad</button>
      </div>

      <h2>Existing Ads</h2>
      <ul>
        {ads.map((ad) => (
          <li key={ad._id}>
            <p>Advertiser: {ad.advertiser}</p>
            <p>Video Path: {ad.videoPath}</p>
            <p>Impressions: {ad.impressions}</p>
            <p>Schedule: {ad.startDate} to {ad.endDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
