import React from "react";
import { Container, Stack, Heading } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";
import UpdateItem from "./components/UpdateItem";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <Container maxW="container.2xl" py={4}>
      <Stack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Inventory Management System
        </Heading>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/update-item/:id" element={<UpdateItem />} />
        </Routes>
      </Stack>
    </Container>
  );
};

export default App;
