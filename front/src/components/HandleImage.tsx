import { Flex, FormLabel, Image, Input } from "@chakra-ui/react";
import { useRef } from "react";

interface HandleImageProps {
  label?: string;
  image: { url: string; file: File | null };
  setImage: React.Dispatch<
    React.SetStateAction<{ url: string; file: File | null }>
  >;
}

const HandleImage = ({ label, image, setImage }: HandleImageProps) => {
  const imgRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (imgFile) {
      const imgUrl = URL.createObjectURL(imgFile);
      setImage({
        url: imgUrl,
        file: imgFile,
      });
    }
  };

  return (
    <Flex flexDir="column">
      {label && (
        <FormLabel mb="0" fontWeight="semibold" color="accent.1">
          {label}
        </FormLabel>
      )}
      <Image
        boxSize="10em"
        objectFit="cover"
        src={image.url}
        fallbackSrc="https://via.placeholder.com/100"
        alt="Image"
        m="0 .25rem .5rem 0"
        borderRadius="5px"
        _hover={{ cursor: "pointer" }}
        onClick={() => imgRef?.current?.click()}
      />
      <Input
        ref={imgRef}
        type="file"
        accept="image/*"
        onChange={handleImage}
        w="full"
        px="0"
        border="none"
        display="none"
        autoComplete="on"
      />
    </Flex>
  );
};

export default HandleImage;
