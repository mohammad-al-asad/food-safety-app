import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

const GoogleButton = () => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      activeOpacity={0.8}
      onPress={() => console.log('Google login pressed')}
    >
      <View style={styles.content}>
        <Image 
          source={require("@/assets/icons/google.png")} 
          style={styles.googleIcon} 
        />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F2E6DB', // Matches the soft cream/beige in the image
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24, // Highly rounded corners as seen in the screenshot
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    // Optional shadow for a bit of depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#2C211A', // Darker brown/charcoal text color
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});

export default GoogleButton;