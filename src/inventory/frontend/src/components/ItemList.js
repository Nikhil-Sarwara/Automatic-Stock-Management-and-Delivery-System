import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useToast,
  Container,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get("/api/items");
      setItems(response.data);
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error fetching the items.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/api/items/${itemId}`);
      toast({
        title: "Item deleted.",
        description: "The item was successfully deleted from the inventory.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchItems();
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error deleting the item.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdate = (itemId) => {
    navigate(`/update-item/${itemId}`);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container maxW="container.lg" p={4}>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        mb={4}
        borderBottomWidth={1}
        pb={4}
      >
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Back"
          onClick={() => navigate(-1)}
          variant="outline"
        />
        <Text fontSize="xl" fontWeight="bold">
          Inventory List
        </Text>
        <IconButton
          icon={<AddIcon />}
          aria-label="Add New Item"
          colorScheme="teal"
          onClick={() => navigate("/add-item")}
        />
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Price</Th>
              <Th>Supplier</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr key={item._id}>
                <Td>{item.name}</Td>
                <Td>{item.description}</Td>
                <Td isNumeric>{item.quantity}</Td>
                <Td isNumeric>${item.price.toFixed(2)}</Td>
                <Td>{item.supplier}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="sm"
                    mr={2}
                    onClick={() => handleUpdate(item._id)}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box
        as="footer"
        borderTopWidth={1}
        pt={4}
        mt={4}
        textAlign="center"
        color="gray.600"
      >
        <Text>© 2024 Inventory Management System. All rights reserved.</Text>
      </Box>
    </Container>
  );
};

export default ItemList;
