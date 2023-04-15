import axios, { CancelToken } from "axios";

export const getPlacesData = async (type: string, sw: any, ne: any) => {
  try {
    if (sw && ne) {
      console.log({ sw, ne });
      const {
        data: { data },
      } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            "X-RapidAPI-Key":
              "b6d88e06e9mshf78c6545bb0c9b0p10a9d9jsn1d8839490f0e",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        }
      );
      console.log("data from api", data);
      return data;
    }
  } catch (error) {
    console.log("error fetching data", error);
    throw new Error("Error fetching data from API");
  }
};
