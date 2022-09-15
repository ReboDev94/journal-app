import { useMemo, useEffect, useRef } from "react";
import { Button, Grid, Typography, TextField, IconButton } from "@mui/material";
import {
  SaveOutlined,
  UploadOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { formatDate } from "../../helpers/date";
import { setActiveNote } from "../../store/slices/journal/actions";
import {
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/slices/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { title, body, date, formState, onInputChange } = useForm(note);
  const dateString = useMemo(() => formatDate(date), [date]);
  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const saveNote = () => {
    dispatch(startSavingNote());
  };

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => fileInputRef.current.click()}
          color="primary"
          disabled={isSaving}
        >
          <UploadOutlined />
        </IconButton>

        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          multiple
          onChange={(e) => onFileInputChange(e)}
        />

        <Button
          disabled={isSaving}
          color="primary"
          sx={{ p: 2 }}
          onClick={saveNote}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          value={title}
          name="title"
          onChange={(e) => onInputChange(e)}
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          value={body}
          name="body"
          onChange={(e) => onInputChange(e)}
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que sucedio hoy"
          minRows={5}
        />
      </Grid>
      {/* Galeria de imagenes */}

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
