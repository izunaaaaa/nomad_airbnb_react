import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { IAmenity, ICategory, IUploadRoomForm } from "../../types";
import { getAmenities, getCategories, uploadRoom } from "../api";
import useHostOnlyPage from "../HostOnlyPage";
import HostOnlyPage from "../HostOnlyPage";
import ProtectedPage from "../ProtectedPage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRoomDetail } from "../../types.d";

export default function UploadRoom() {
  useHostOnlyPage();
  const { register, handleSubmit } = useForm<IUploadRoomForm>();
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  const toast = useToast();
  const navigate = useNavigate();
  const onSubmit = (data: IUploadRoomForm) => {
    mutation.mutate(data);
  };
  const mutation = useMutation(uploadRoom, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: "success",
        title: "Room created",
        description: `Upload Success ${data.name}`,
        position: "top",
      });
      console.log(data);
      navigate(`/rooms/${data.id}`);
    },
  });
  return (
    <ProtectedPage>
      {/* <HostOnlyPage> */}
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack
            spacing={"8"}
            as="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write the name of your room. </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register("country", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaDollarSign />} />
                <Input
                  {...register("price", { required: true })}
                  required
                  type={"number"}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register("rooms", { required: true })}
                  required
                  type={"number"}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  required
                  type={"number"}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea {...register("description", { required: true })} />
            </FormControl>
            <FormControl>
              <Checkbox {...register("pet_friendly")}>Pet friendly?</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of room</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="Choose a Kind"
              >
                <option value="entire_place">Entire Place</option>
                <option value="private_room">Prive Room</option>
                <option value="shared_room">Shared Room</option>
              </Select>
              <FormHelperText>What is your room category? </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="Choose a Category"
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>What Kind of your room are you?</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox
                      value={amenity.pk}
                      {...register("amenities", { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.isError ? <Text>somthing wrong</Text> : null}
            <Button
              isLoading={mutation.isLoading}
              type={"submit"}
              colorScheme={"red"}
              size={"lg"}
              w="100% "
            >
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
      {/* </HostOnlyPage> */}
    </ProtectedPage>
  );
}
