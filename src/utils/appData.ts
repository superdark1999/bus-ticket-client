import $ from "jquery";

export interface IWardsLocation {
  Id: string;
  Name: string;
}
export interface IDistrictLocation {
  Id: string;
  Name: string;
  Wards: IWardsLocation[];
}

export interface ICityLocation {
  Id: string;
  Name: string;
  Districts: IDistrictLocation[];
}

export const getLocationData = async (): Promise<ICityLocation[]> => {
  const promise = new Promise<ICityLocation[]>((res) => {
    $.getJSON("/data/location.json", (data: any) => {
      console.log("🚀 ~ file: appData.ts ~ line 8 ~ data ~ data", data);
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
