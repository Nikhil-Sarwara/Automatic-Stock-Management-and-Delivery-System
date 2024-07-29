import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${id}`);
        const itemData = response.data;
        setItem(itemData);
        setName(itemData.name);
        setDescription(itemData.description);
        setQuantity(itemData.quantity);
        setMinQuantity(itemData.min_quantity);
        setPrice(itemData.price);
        setSupplier(itemData.supplier);
      } catch (error) {
        toast({
          title: "Error.",
          description: "There was an error fetching the item details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchItem();
  }, [id, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/items/${id}`, {
        name,
        description,
        quantity,
        min_quantity: minQuantity,
        price,
        supplier,
      });
      toast({
        title: "Item updated.",
        description: "The item was successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/items");
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error updating the item.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <FormControl id="name" mb={4}>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl id="quantity" mb={4}>
        <FormLabel>Quantity</FormLabel>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </FormControl>
      <FormControl id="min_quantity" mb={4}>
        <FormLabel>Minimum Quantity</FormLabel>
        <Input
          type="number"
          value={minQuantity}
          onChange={(e) => setMinQuantity(e.target.value)}
        />
      </FormControl>
      <FormControl id="price" mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormControl>
      <FormControl id="supplier" mb={4}>
        <FormLabel>Supplier</FormLabel>
        <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={handleSubmit}>
        Update Item
      </Button>
    </Box>
  );
};

export default UpdateItem;
