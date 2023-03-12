import styled from 'styled-components';

import * as Bs from 'react-icons/bs';

export default function Rooms({ selectedRoom, setSelectedRoom, rooms }) {
  return (
    <RoomsContainer>
      {rooms &&
        rooms.rooms.map((room) => {
          const occupied = room._count.Booking;
          const available = room.capacity - occupied;

          return (
            <Room
              key={room.id}
              isFull={available <= 0}
              selected={room.id === selectedRoom}
              onClick={() => setSelectedRoom(room.id)}
            >
              <p className="room-name">{room.name}</p>
              <div className="capacity">
                {Array.from({ length: room.capacity }).map((_, i) => {
                  if (i < available) {
                    if (selectedRoom === room.id && i === available - 1) {
                      return <Bs.BsPersonFill key={i} color="#FF4791" size="20px" />;
                    }
                    return <Bs.BsPerson key={i} size="20px" />;
                  }
                  return <Bs.BsPersonFill key={i} size="20px" />;
                })}
              </div>
            </Room>
          );
        })}
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

  background: ${({ isFull }) => (isFull ? '#E9E9E9' : '#fff')};
  color: ${({ isFull }) => (isFull ? '#8C8C8C' : '#454545')};

  cursor: ${({ isFull }) => isFull && 'not-allowed'};
  pointer-events: ${({ isFull }) => isFull && 'none'};

  background: ${({ selected }) => selected && '#FFEED2'};

  border: 1px solid #cecece;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: pointer;
    filter: brightness(0.97);
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
