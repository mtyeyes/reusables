const useGeolocationApi = () => {
  const getGeodata = async () => {
    const geolocationApi = navigator.geolocation;

    const coordinates = new Promise((resolve, reject) => {
      if (geolocationApi) {
        geolocationApi.getCurrentPosition(
          (location: { coords: { latitude: number; longitude: number } }) => {
            const lat = location.coords.latitude;
            const lng = location.coords.longitude;
            resolve({ lat, lng });
          },
          () => {
            reject('Something went wrong');
          },
        );
      } else {
        reject('This function is not supported by your browser');
      }
    }).catch((err: string) => {
      console.error(err);
      return { lat: undefined, lng: undefined };
    });
    return await coordinates;
  };

  return getGeodata;
};

export default useGeolocationApi;
