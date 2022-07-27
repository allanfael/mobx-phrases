import React from 'react';
import { Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X = -SCREEN_WIDTH * 0.3;

type SwipeProps = {
  children: React.ReactNode;
  onSwipe: () => void;
} & Pick<PanGestureHandlerProps, 'simultaneousHandlers'>;

const Swipe = ({ children, onSwipe }: SwipeProps) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X;

      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onSwipe) {
            runOnJS(onSwipe)();
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: interpolate(
      translateX.value,
      [0, -200],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[0, 0]}
        onGestureEvent={panGesture}
      >
        <Animated.View style={rStyle}>{children}</Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Swipe;
