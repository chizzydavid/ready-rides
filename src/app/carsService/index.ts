import { apolloClient } from "../../utils/graphql";
import { GET_ALL_CARS } from "./queries";
import { GetCars_cars } from "./__generated__/GetCars";
import cars from "../../utils/dummyCars";

class CarService {
  public async getCars(getLocal: boolean): Promise<GetCars_cars[]> {
    if (getLocal) {
      return cars as GetCars_cars[];
    }
    const response = await apolloClient
      .query({ query: GET_ALL_CARS })
      .catch((err: string) => {
        throw err;
      });
    if (response && response.data && response.data.cars)
      return response.data.cars as GetCars_cars[];

    return [];
  }
}

export default new CarService();

