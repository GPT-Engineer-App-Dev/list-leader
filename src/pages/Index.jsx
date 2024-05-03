import { useState } from 'react';
import { Box, Button, Flex, Input, List, ListItem, Text, useColorModeValue, VStack, IconButton, Heading } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = { id: Date.now(), text: input, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={8} bg={useColorModeValue('gray.50', 'gray.800')}>
      <VStack spacing={8}>
        <Heading mb={6}>Todo App</Heading>
        <Flex as="nav">
          <Button mx="auto">Home</Button>
        </Flex>
        <Flex>
          <Input
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <IconButton
            icon={<FaPlus />}
            onClick={handleAddTask}
            colorScheme="green"
            ml={2}
          />
        </Flex>
        <List spacing={3} w="full">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" bg={useColorModeValue('white', 'gray.700')} p={4} borderRadius="md">
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Flex>
                <IconButton
                  icon={<FaCheckCircle />}
                  onClick={() => handleToggleComplete(task.id)}
                  colorScheme={task.isCompleted ? "green" : "gray"}
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTask(task.id)}
                  colorScheme="red"
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default Index;