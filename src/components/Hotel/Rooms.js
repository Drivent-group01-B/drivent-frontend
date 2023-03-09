import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import * as Bs from 'react-icons/bs';

import { getHotelsWithRooms } from '../../services/hotelApi';

export default function Rooms({ token, hotelId }) {
  const [hotelsWithRooms, setHotelsWithRooms] = useState(null);

  async function fetchHotelWithRoomsData() {
    try {
      const response = await getHotelsWithRooms(token, hotelId);
      setHotelsWithRooms(response);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  useEffect(() => {
    fetchHotelWithRoomsData();
  }, []);

  return (
    <RoomsContainer>
      {hotelsWithRooms &&
        hotelsWithRooms.Rooms.map((room) => (
          <Room key={room.id}>
            <p className="room-name">{room.name}</p>
            <div className="capacity">
              {Array.from({ length: room.capacity }).map((_, i) => (
                <Bs.BsPerson key={i} size="20px" />
              ))}
            </div>
          </Room>
        ))}
    </RoomsContainer>
  );
}

const RoomsContainer = styled.div`
  display: flex;
  row-gap: 8px;
  column-gap: 17px;

  flex-wrap: wrap;
`;

const Room = styled.div`
  width: 190px;
  padding: 10px 16px;

  border: 1px solid #cecece;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: '#454545';

  &:hover {
    cursor: pointer;
  }

  .room-name {
    font-size: 20px;
    line-height: 23px;
    font-weight: 700;

    margin-right: 6px;
  }

  .capacity {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
`;
