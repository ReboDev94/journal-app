import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageGallery = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={3} rowHeight={200}>
      {images.map((img) => (
        <ImageListItem key={img}>
          <img src={img} srcSet={img} alt="Imagen de la nota" loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
