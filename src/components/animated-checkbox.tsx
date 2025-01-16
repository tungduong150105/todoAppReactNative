import React, { useEffect, memo } from 'react'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolateColor,
  withSequence
} from 'react-native-reanimated'
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg'

const MARGIN = 10
const vWidth = 64 + MARGIN
const vHeight = 64 + MARGIN

const checkMarkPath = 'M8 32.5C18 39 26 47 26 47C26 47 33 28 63.5 4'
const outLineBoxPath =
  'M24 0.5H40C48.5809 0.5 54.4147 2.18067 58.117 5.88299C61.8193 9.58532 63.5 15.4191 63.5 24V40C63.5 48.5809 61.8193 54.4147 58.117 58.117C54.4147 61.8193 48.5809 63.5 40 63.5H24C15.4191 63.5 9.58532 61.8193 5.88299 58.117C2.18067 54.4147 0.5 48.5809 0.5 40V24C0.5 15.4191 2.18067 9.58532 5.88299 5.88299C9.58532 2.18067 15.4191 0.5 24 0.5Z'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface Props {
  checked?: boolean
}

const AnimatedCheckBox = (props: Props) => {
  const { checked } = props
  const checkMarkColor = '#000000'
  const highlightColor = '#ff0000'
  const boxOutLineColor = '#000000'

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear
    })
  }, [checked])

  const animatedBoxProps = useAnimatedProps(() => ({
    stroke: interpolateColor(
      Easing.bezierFn(0.16, 1, 0.3, 1)(progress.value),
      [0, 1],
      [boxOutLineColor, highlightColor],
      'RGB'
    ),
    fill: interpolateColor(
      Easing.bezierFn(0.16, 1, 0.3, 1)(progress.value),
      [0, 1],
      ['#00000000', highlightColor],
      'RGB'
    )
  }))

  return (
    <Svg
      viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}
    >
      <AnimatedPath
        d={outLineBoxPath}
        strokeWidth={5}
        strokeLinejoin="round"
        strokeLinecap="round"
        animatedProps={animatedBoxProps}
      />
      <Path d={checkMarkPath} stroke="black" fill="transparent" />
    </Svg>
  )
}

export default AnimatedCheckBox
