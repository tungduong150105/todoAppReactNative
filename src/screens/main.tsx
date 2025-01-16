import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'
import {
  Text,
  Box,
  Center,
  VStack,
  themeTools,
  useTheme,
  useColorModeValue
} from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import AnimatedCheckBox from '../components/animated-checkbox'

export default function MainScreen() {
  const [checked, setChecked] = useState(false)

  const handlePressCheckBox = useCallback(() => {
    setChecked(prev => !prev)
  }, [])

  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Box w="100px" h="100px">
          <Pressable onPress={handlePressCheckBox}>
            <AnimatedCheckBox checked={checked} />
          </Pressable>
        </Box>
        <Box p={5} bg={useColorModeValue('red.500', 'yellow.500')}>
          <Text>Hello</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}
