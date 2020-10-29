export interface IIp {
    _id?: string;
    title: string;
    fullAddress: IAddress;
    ip: string;
    city: string;
}

export interface IAddress {
    address?: string;
    latitude: number;
    longitude: number;
}

export interface IIpAddress {
    _id: string;
    address: IAddress;
    ip: string;
}
