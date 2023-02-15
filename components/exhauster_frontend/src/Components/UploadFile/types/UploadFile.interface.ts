type UploadFileProps = {
  title: string;
  onFilesChange: (files: FileList) => void;
  className?: string;
};

export default UploadFileProps;
