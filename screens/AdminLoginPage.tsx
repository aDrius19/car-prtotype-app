import React from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {StackScreenProps} from "@react-navigation/stack";


const AdminLoginPage: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })


    async function signIn() {
        const re =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        if (value.email.trim().length === 0 || value.password.trim().length === 0) {
            setValue({
                ...value,
                error: 'Email and Password are mandatory!'
            })
            return;
        }

        if (!re.test(value.email)) {
            setValue({
                ...value,
                error: 'Email format is not correct!'
            })
            return;
        } else if (re.test(value.email) && (value.email != "test@test-cluj.com" || value.password != "test123")) {
            setValue({
                ...value,
                error: 'Email and/or password are not correct!'
            })
            return;
        }

        if (value.email === "test@test-cluj.com" && value.password === "test123") {
            alert("Administrator User successfully logged in!")
            navigation.navigate("Admin Panel Space");
        }
    }

    return (
        <View style={styles.container}>
            <Text>Login with administrator credentials!</Text>

            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

            <View style={styles.controls}>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    value={value.email}
                    onChangeText={(text) => setValue({...value, email: text})}
                    keyboardType={"email-address"}
                />

                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    value={value.password}
                    onChangeText={(text) => setValue({...value, password: text})}
                    secureTextEntry={true}
                    keyboardType={"default"}
                />

                <Button title="Sign in" buttonStyle={styles.control} onPress={signIn}/>
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

    controls: {
        flex: 1,
    },

    control: {
        marginTop: 10
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
    }
});

export default AdminLoginPage;