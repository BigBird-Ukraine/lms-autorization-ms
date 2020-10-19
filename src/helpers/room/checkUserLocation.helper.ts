import { IAddress, IIpRoom } from '../../interfaces';

export const checkUserLocation = (room: IIpRoom, address: IAddress) => {
    const ky = 40000 / 360;
    const kx = Math.cos(Math.PI * room.ip_address.fullAddress.latitude / 180.0) * ky;
    const dx = Math.abs(room.ip_address.fullAddress.longitude - address.longitude) * kx;
    const dy = Math.abs(room.ip_address.fullAddress.latitude - address.latitude) * ky;

    return Math.sqrt(dx * dx + dy * dy) <= 0.5;
};
