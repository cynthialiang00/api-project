
import React from 'react';
import { useModal } from '../../../context/Modal';
import "./SpotShow.css";

function OpenReserveMenuItem({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    };

    return (
        <button className="reserve-button" onClick={onClick}>{itemText}</button>
    );
}

export default OpenReserveMenuItem;