import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Button} from 'react-native-elements';

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Dealership!</Text>
            <Text>{'\n'}</Text>
            <View style={styles.buttons}>
                <Button title="Test User for this dealership!" buttonStyle={styles.button}
                        onPress={() => navigation.navigate('Test User Page')}/>
                <Button title="Administrator Login" type="outline" buttonStyle={styles.button}
                        onPress={() => navigation.navigate('Admin User Page')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttons: {
        flex: 1,
    },

    button: {
        marginTop: 10
    }
});

export default WelcomeScreen;