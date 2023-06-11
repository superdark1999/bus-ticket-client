import $ from 'jquery';

export interface ILocation {
  Id: string;
  Name: string;
  [key: string]: any;
}
export type IWardsLocation = ILocation;
export interface IDistrictLocation extends ILocation {
  Wards: IWardsLocation[];
}

export interface ICityLocation extends ILocation {
  Districts: IDistrictLocation[];
}

const getLocationData = async (): Promise<ICityLocation[]> => {
  const promise = new Promise<ICityLocation[]>((res) => {
    $.getJSON('/data/location.json', (data: any) => {
      res(data);
    });
  });

  return promise;
};

const getLocationName = (data: ICityLocation[], cityId: string, districtId?: string, wardId?: string) => {
  const city = data.find((item) => item.Id === cityId);
  const district = city?.Districts.find((item) => item.Id === districtId);
  const ward = district?.Wards.find((item) => item.Id === wardId);

  let listName: string[] = [];
  if (ward) listName.push(ward.Name);
  if (district) listName.push(district.Name);
  if (city) listName.push(city.Name);
  listName = listName.map((name) => name.trim());
  const name = listName.join(' - ');
  return name;
};

const isSubstring = (parent: string, child: string) => parent.toLocaleLowerCase().includes(child.toLocaleLowerCase());

export const LocationCommon = {
  getLocationData,
  getLocationName,
  isSubstring,
};
