import { React } from 'react';
import Modal from './Modal';
import './ticket.css';

function Ticket({ onClose, open }) {
  return (
    <Modal modalLable="Ticket" onClose={onClose} open={open}>
      <widget type="ticket" className="--flex-column">
        <div className="bottom --flex-row-j!sb">
          <div className="barcode" />
        </div>
        <div className="top --flex-column">
          <div className="bandname -bold">新直播主</div>
          <div className="tourname">Home Tour</div>
          <img src="/images/club/splat_ticket.jpg" alt="" />
          <div className="deetz --flex-row-j!sb">
            <div className="event --flex-column">
              <div className="date">3rd March 2017</div>
              <div className="location -bold">2:00 pm</div>
            </div>
            <div className="price --flex-column">
              <div className="label">Price</div>
              <div className="cost -bold">Free</div>
            </div>
          </div>
        </div>
      </widget>
    </Modal>
  );
}

export default Ticket;
