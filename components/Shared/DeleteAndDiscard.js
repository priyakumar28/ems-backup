import React from "react";
import { Button, Stack } from "react-bootstrap";
import CloseIcon from "../Icons/CloseIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import Span from "./Span";


function DeleteAndDiscard(props) {
    const { className, isClick, onDelete, onClose, isSubmitting } = props;

    return (
        <Stack direction="horizontal" className={"pt-3" + (className ? ` ${className}` : "")} onClick={isClick}>
            <Button variant="delete" disabled={isSubmitting} onClick={onDelete} className='delete'><DeleteIcon /> <Span className='ms-2'>{isSubmitting ? 'Deleting...' : 'Delete'}</Span></Button>
            <Button variant="outlineDark" onClick={onClose}><CloseIcon /> <Span className='ms-2'>Discard</Span></Button>{' '}
        </Stack>
    );
}

export default DeleteAndDiscard;