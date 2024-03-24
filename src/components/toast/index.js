import React from 'react';
import { YStack, Button, Toast, ToastProvider, useToast, Text, StyleSheet } from 'tamagui';

const ToastPop = () => {
    // State to manage toast open/close
    const [open, setOpen] = React.useState(false);
  
    // Ref to manage timer
    const timerRef = React.useRef(0);

    // Effect to clean up timer on unmount
    React.useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <ToastProvider> {/* Wrap your component with ToastProvider */}
            <YStack ai="center">
                {/* Button to trigger toast */}
                <Button
                    onPress={() => {
                        setOpen(false); // Close any existing toast
                        clearTimeout(timerRef.current); // Clear previous timeout
                        timerRef.current = setTimeout(() => {
                            setOpen(true); // Set open to true after delay
                        }, 150);
                    }}
                >
                    Single Toast
                </Button>

                {/* Toast component */}
                <Toast
                    onOpenChange={setOpen} // Update open state when toast opens/closes
                    open={open} // State to manage toast open/close
                    animation="100ms" // Animation duration
                    enterStyle={{ x: -20, opacity: 0 }} // Enter animation style
                    exitStyle={{ x: -20, opacity: 0 }} // Exit animation style
                    opacity={1} // Opacity of toast
                    x={0} // Horizontal position of toast
                >
                    {/* Content of the toast */}
                    <Text >Subscribed!</Text>
                    <Text>We'll be in touch.</Text>
                </Toast>
            </YStack>
        </ToastProvider>
    );
};


export default ToastPop;
