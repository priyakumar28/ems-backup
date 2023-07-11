import React from "react";
import { Button, Stack } from "react-bootstrap";
import CloseIcon from "../Icons/CloseIcon";
import SaveIcon from "../Icons/SaveIcon";



function SaveAndDiscard(props) {
    const { className, isClick, isSubmitting } = props;

    return (
        <>
            <Stack direction="horizontal" className={"pt-3 mt-1 justify-content-end" + (className ? ` ${className}` : "")} onClick={isClick}>
                <Button type="submit" disabled={isSubmitting} variant="save" className='save'><SaveIcon className='me-2' />{isSubmitting ? 'Saving...' : 'Save'}</Button>
                <Button variant="outlineDark" onClick={isClick}><CloseIcon className='me-2' />Discard</Button>
            </Stack>
        </>

    );
}

export default SaveAndDiscard;