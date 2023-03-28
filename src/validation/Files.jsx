import { Grid, IconButton } from "@mui/material";
import UploadIcon from "assets/svg/Upload";
import { useFormikContext } from "formik/dist";
import { useRef, useState, useEffect } from "react";
export const UploadComponent = ({ name, multiple, ...rest }) => {
  const { setFieldValue } = useFormikContext();
  const [file, setFile] = useState({
    files: [],
    preview: [],
  });
  const ref = useRef();
  useEffect(() => {
    setFieldValue(name, {
      file: file.files,
      preview: file.preview,
    });
    //eslint-disable-next-line
  }, [file, name]);
  const handleUpload = (file) => {
    let arr = [];
    for (let i = 0; i <= file.length - 1; i++) {
      const objectUrl = URL.createObjectURL(file[i]);
      arr.push(objectUrl);
    }
    setFile({
      files: [...file],
      preview: arr,
    });
    // }
  };
  //   [preview, setFieldValue, name]
  // );
  //  useEffect(() => {
  //    if (!selectedFile) {
  //      setPreview(undefined);
  //      return;
  //    }
  // b
  return (
    <Grid
      id="drop-area"
      item
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ border: "2px dashed #CD64FF", minHeight: "15rem" }}
    >
      <input
        type="file"
        {...rest}
        ref={ref}
        multiple={multiple}
        onChange={(e) => handleUpload(e.target.files)}
        style={{ display: "none" }}
        accept="image/*"
      />
      <IconButton size="large" onClick={() => ref?.current.click()}>
        <UploadIcon sx={{ fontSize: "5rem" }} />
      </IconButton>
    </Grid>
  );
};
