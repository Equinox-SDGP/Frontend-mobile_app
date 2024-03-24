import { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorPopup from '../components/errorPopUp';
import * as Notifications from 'expo-notifications';


/**
 * Hook for querying to backend
 * @param {*} endpoint
 * @param {*} query
 * @param {*} method
 * @returns { data, isLoading, error, refetch }
 */

// Function to send a notification
const sendNotification = async (title, body) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: { seconds: 2 },
  });
};


const useFetch = (endpoint, query, method) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request({
        method: method,
        url: `http://localhost:3000${endpoint}`,
        params: query, // Pass query directly here
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log('Error fetching data: ', error);
      sendNotification('Error', `Error fetching data: ${error}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to only run once on mount

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
