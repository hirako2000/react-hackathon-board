import React, { PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
import ReactDOMServer from 'react-dom/server';

var dropzone;
var fileName;
var hack;

var componentConfig = {
  iconFiletypes: ['.jpg', '.png', '.gif'],
  showFiletypeIcon: true,
  maxFiles: 1,
  maxFilesize: 1, // MB
  addRemoveLinks: true,
  postUrl: '/api/hacks/upload-image'
};

var getServerFileName = function(first, response) {
  fileName = response.filename;
  hack.pictureURL = fileName;
};

var addedFileCallBack = function (file) {
  if(dropzone.files && dropzone.files.length > 1) {
    console.log("Removing previous upload ");
    dropzone.removeFile(dropzone.files[0]);
  }
};

var eventHandlers = {
  // This one receives the dropzone object as the first parameter
  // and can be used to additional work with the dropzone.js
  // object
  init: (DzObject) => {
    dropzone = DzObject;
  },
  // All of these receive the event as first parameter:
  drop: addedFileCallBack,
  dragstart: null,
  dragend: null,
  dragenter: null,
  dragover: null,
  dragleave: null,
  // All of these receive the file as first parameter:
  addedfile: addedFileCallBack,
  removedfile: null,
  thumbnail: null,
  error: null,
  processing: null,
  uploadprogress: null,
  sending: null,
  success: getServerFileName,
  complete: null,
  canceled: null,
  maxfilesreached: null,
  maxfilesexceeded: null,
  // All of these receive a list of files as first parameter
  // and are only called if the uploadMultiple option
  // in djsConfig is true:
  processingmultiple: null,
  sendingmultiple: null,
  successmultiple: null,
  completemultiple: null,
  canceledmultiple: null,
  // Special Events
  totaluploadprogress: null,
  reset: null,
  queuecomplete: null
};

var djsConfig = {
  uploadMultiple: false,
  maxFiles: 1
};

export class DropzoneSingleImageComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  };

  componentWillMount() {
  }

  render() {
    console.log("render dropzone");
    hack = this.props.hack;
    return (
      <DropzoneComponent config={componentConfig}
                         eventHandlers={eventHandlers}
                         djsConfig={djsConfig}
      />
    );
  }
}

export default DropzoneSingleImageComponent;
