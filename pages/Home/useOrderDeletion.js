import { useState } from 'react';
import axios from 'axios';

const useOrderDeletion = () => {
  const [deletionStatus, setDeletionStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const handleOrderDeletion = async (orderId) => {
    setDeletionStatus({
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_DELIVERY}delete/${orderId}`
      );

      if (response.status === 200) {
        setDeletionStatus({
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
      }
    } catch (error) {
      console.error(error);
      setDeletionStatus({
        isLoading: false,
        isSuccess: false,
        isError: true,
      });
    }
  };

  return {
    deletionStatus,
    handleOrderDeletion,
  };
};

export default useOrderDeletion;
