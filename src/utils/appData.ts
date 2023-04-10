import $ from "jquery";

export interface ILocation {
  Id: string;
  Name: string;
  [key: string]: any;
}
export interface IWardsLocation extends ILocation {}
export interface IDistrictLocation extends ILocation {
  Wards: IWardsLocation[];
}

export interface ICityLocation extends ILocation {
  Districts: IDistrictLocation[];
}

export const getLocationData = async (): Promise<ICityLocation[]> => {
  const promise = new Promise<ICityLocation[]>((res) => {
    $.getJSON("/data/location.json", (data: any) => {
      res(data);
    });
  });

  return promise;
};

export const getLocationName = (
  data: ICityLocation[],
  cityId: string,
  districtId?: string,
  wardId?: string
) => {
  const city = data.find((city) => city.Id === cityId);
  const district = city?.Districts.find(
    (district) => district.Id === districtId
  );
  const ward = district?.Wards.find((ward) => ward.Id === wardId);

  let listName: string[] = [];
  if (ward) listName.push(ward.Name);
  if (district) listName.push(district.Name);
  if (city) listName.push(city.Name);
  listName = listName.map((name) => name.trim());
  const name = listName.join(" - ");
  return name;
};

export const LocationCommon = {
  getLocationData,
  getLocationName,
};
