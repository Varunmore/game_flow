import React, { useState, useEffect } from 'react';
import { db } from "../Firebase/Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const AdInventory = () => {
  const [ads, setAds] = useState([]);
  const [adUrl, setAdUrl] = useState("");

  useEffect(() => {
    const fetchAds = async () => {
      const querySnapshot = await getDocs(collection(db, "ads"));
      setAds(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchAds();
  }, []);

  const handleAddAd = async () => {
    try {
      await addDoc(collection(db, "ads"), {
        videoUrl: adUrl,
        targeting: "free-users"
      });
      setAdUrl("");
    } catch (error) {
      console.error("Error adding ad: ", error);
    }
  };

  return (
    <div>
      <h2>Ad Inventory</h2>
      <div>
        <input
          type="text"
          placeholder="Ad Video URL"
          value={adUrl}
          onChange={(e) => setAdUrl(e.target.value)}
        />
        <button onClick={handleAddAd}>Add Ad</button>
      </div>
      <h3>Existing Ads</h3>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>{ad.videoUrl}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdInventory;
