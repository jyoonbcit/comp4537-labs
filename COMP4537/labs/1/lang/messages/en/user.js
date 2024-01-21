const messages = {
    TITLE: 'Lab 01 - JSON, Object Constructor, localStorage',
    STORAGE_TIME: 'Last saved at: ',
    UPDATE_TIME: 'Last updated at: ',
    NOTE_DIV: (timestamp, content) => 
        `<div id='note-row-${timestamp}'> 
            <textarea id='note-ta-${timestamp}'>${content}</textarea> 
            <button id='remove${timestamp}'>Remove</button> 
        </div>`,
    NOTE_DIV_NO_REMOVE: (timestamp, content) =>
        `<div id='note-row-${timestamp}'> 
            <textarea id='note-ta-${timestamp}'>${content}</textarea> 
        </div>`,
    ADD_BTN: 'Add',
    BACK_BTN: 'Back',
    WRITER_BTN: 'Writer',
    READER_BTN: 'Reader'
}

export default messages