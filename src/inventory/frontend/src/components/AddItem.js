import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
  HStack,
  Image,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const addItemImage =
  "https://t4.ftcdn.net/jpg/04/90/35/05/360_F_490350517_SOIsNLd72HvWxfegM4W74Ykz4sIsmT4I.jpg";

const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!description) errors.description = "Description is required";
    if (!quantity || quantity <= 0)
      errors.quantity = "Quantity must be a positive number";
    if (!minQuantity || minQuantity < 0)
      errors.minQuantity = "Minimum Quantity must be a non-negative number";
    if (!price || price <= 0) errors.price = "Price must be a positive number";
    if (!supplier) errors.supplier = "Supplier is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await axios.post("/api/items", {
        name,
        description,
        quantity,
        min_quantity: minQuantity,
        price,
        supplier,
      });
      toast({
        title: "Item added.",
        description: "The item was successfully added to the inventory.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/items"); // Redirect to item list page
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error adding the item.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={4}
      maxW="container.md"
      mx="auto"
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <HStack mb={4}>
        <Button colorScheme="gray" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Spacer />
        <Image
          src={addItemImage}
          alt="Add Item"
          boxSize="100px"
          objectFit="cover"
        />
      </HStack>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!validationErrors.name}
            errorBorderColor="red.300"
          />
          {validationErrors.name && (
            <Text color="red.500">{validationErrors.name}</Text>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isInvalid={!!validationErrors.description}
            errorBorderColor="red.300"
          />
          {validationErrors.description && (
            <Text color="red.500">{validationErrors.description}</Text>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            isInvalid={!!validationErrors.quantity}
            errorBorderColor="red.300"
          />
          {validationErrors.quantity && (
            <Text color="red.500">{validationErrors.quantity}</Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Minimum Quantity</FormLabel>
          <Input
            type="number"
            value={minQuantity}
            onChange={(e) => setMinQuantity(e.target.value)}
            isInvalid={!!validationErrors.minQuantity}
            errorBorderColor="red.300"
          />
          {validationErrors.minQuantity && (
            <Text color="red.500">{validationErrors.minQuantity}</Text>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={!!validationErrors.price}
            errorBorderColor="red.300"
          />
          {validationErrors.price && (
            <Text color="red.500">{validationErrors.price}</Text>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Supplier</FormLabel>
          <Input
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            isInvalid={!!validationErrors.supplier}
            errorBorderColor="red.300"
          />
          {validationErrors.supplier && (
            <Text color="red.500">{validationErrors.supplier}</Text>
          )}
        </FormControl>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Add Item
        </Button>
      </VStack>
    </Box>
  );
};

export default AddItem;
