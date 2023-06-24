import axios from 'axios';
import {
  useCallback,
  useMemo,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/delivery`;

const useDelivery = () => {
  const track = useCallback(async (trackCode, verificationCode) => {
    const body = await axios.get(`${baseUrl}/${trackCode}/verification/${verificationCode}`);
    return body.data;
  }, []);

  const deliveryApi = useMemo(() => ({
    track,
  }), [track]);

  return deliveryApi;
};

export default useDelivery;