import {useEffect, useState } from "react";

export const useHash = (delimiter: string) => {
  const [hashValues, setHashValues] = useState<any>([]);

  useEffect(() => {
    const hashToValuesMap = () => {
      const newHash = window.location.hash;
      let valuesMap = newHash
        .slice(1)
        .split(delimiter)
        .map(hashProperty => {
          const [propertyName, ...rest] = hashProperty.split("=");
          const propertyValue = rest.join('=')

          return {propertyName, propertyValue};
      });

      setHashValues(valuesMap);
    };

    hashToValuesMap();

    window.addEventListener("hashchange", hashToValuesMap);
    return () => {
      window.removeEventListener("hashchange", hashToValuesMap);
    };
  }, []);

  return hashValues;
};
