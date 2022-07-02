import * as React from 'react';
import {Button, StyleSheet, Switch, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect} from "react";
import {getDatabase, ref, onValue, update} from "firebase/database";
import {ButtonGroup} from "react-native-elements";

function AdminHomeScreen() {
    const [userValue, setUserValue] = React.useState("")
    const db = getDatabase();
    const ref1 = ref(db, 'Prototype/qr_code_value');

    useEffect(() => {
        onValue(ref1, (snapshot) => {
            const data1 = snapshot.val();
            setUserValue(data1);
        });
    }, []);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Welcome, admin-cluj-01!</Text>
            <Text>{'\n'}</Text>
            <Text>Users administrated: {userValue}</Text>
        </View>
    );
}

function AdminMonitorScreen() {
    const [tempValue, setTempValue] = React.useState(null)
    const [humidValue, setHumidValue] = React.useState(null)
    const [distValue, setDistValue] = React.useState(null)
    const [lightValue, setLightValue] = React.useState(null)

    const db = getDatabase();
    const ref1 = ref(db, 'Prototype/temperature_value');
    const ref2 = ref(db, 'Prototype/humidity_value');
    const ref3 = ref(db, 'Prototype/distance_from_object_value');
    const ref4 = ref(db, 'Prototype/light_intensity_value');

    useEffect(() => {
        onValue(ref1, (snapshot) => {
            const data1 = snapshot.val();
            setTempValue(data1);
        });

        onValue(ref2, (snapshot) => {
            const data2 = snapshot.val();
            setHumidValue(data2);
        });

        onValue(ref3, (snapshot) => {
            const data3 = snapshot.val();
            setDistValue(data3);
        });

        onValue(ref4, (snapshot) => {
            const data4 = snapshot.val();
            setLightValue(data4);
        });

    }, [ref1, ref2, ref3, ref4])

    return (
        <View style={styles.container}>
            <Text>Monitor Sensor data!</Text>
            <Text>{'\n'}</Text>
            <Text>Temperature: {tempValue}°C</Text>
            <Text>{'\n'}</Text>
            <Text>Humidity: {humidValue}%</Text>
            <Text>{'\n'}</Text>
            <Text>Distance: {distValue}cm</Text>
            <Text>{'\n'}</Text>
            <Text>Light Intensity: {lightValue}cd</Text>
        </View>
    );
}

function AdminControlScreen() {
    const [servoValue, setServoValue] = React.useState<number>(0)
    const [gearboxValue, setGearboxValue] = React.useState<number>(0)
    const [isReversed, setIsReversed] = React.useState(false)
    const db = getDatabase();
    const ref1 = ref(db, 'Prototype');

    const changeServo = (value: number) => {
        const newServo = servoValue + value;
        update(ref1, {servo_motor_value: newServo}).then(() => setServoValue(newServo));
    }

    const setServo = (value: number) => {
        update(ref1, {servo_motor_value: value}).then(() => setServoValue(value));
    }

    const changeGearBoxMotors = (value: number) => {
        const newGearBoxMotors = gearboxValue + value;
        update(ref1, {gearbox_motors_value: newGearBoxMotors}).then(() => setGearboxValue(newGearBoxMotors));
    }

    const setGearBoxMotors = (value: number) => {
        update(ref1, {gearbox_motors_value: value}).then(() => setGearboxValue(value));
    }

    const toggleSwitch = () => {
        if (isReversed)
            update(ref1, {isReversed: "false"}).then(() => true);
        else update(ref1, {isReversed: "true"}).then(() => false);

        setIsReversed(previousState => !previousState);
    }

    const button1 = <Button title="<" onPress={() => changeServo(-5)}/>;
    const button2 = <Button title="*" onPress={() => setServo(130)}/>;
    const button3 = <Button title=">" onPress={() => changeServo(5)}/>;
    const button4 = <Button disabled={gearboxValue <= 0} title="-" onPress={() => changeGearBoxMotors(-10)}/>;
    const button5 = <Button title="⚬" onPress={() => setGearBoxMotors(0)}/>;
    const button6 = <Button title="+" onPress={() => changeGearBoxMotors(10)}/>;

    return (
        <View style={styles.container}>
            <Text>Control the Prototype car!</Text>
            <Text>{'\n'}</Text>
            <Text>Front Servo driven Wheels</Text>
            <ButtonGroup buttons={[button1, button2, button3]}/>
            <Text>Back Driving Wheels</Text>
            <ButtonGroup buttons={[button4, button5, button6]}/>
            <Text>Reverse gear</Text>
            <Switch
                trackColor={{false: "#767577", true: "#81b0ff"}}
                thumbColor={isReversed ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isReversed}
            />
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

    error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
    }
});

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Main Menu" component={AdminHomeScreen}/>
        </HomeStack.Navigator>
    );
}

const ControlStack = createNativeStackNavigator();

function ControlStackScreen() {
    return (
        <ControlStack.Navigator>
            <ControlStack.Screen name="Control Menu" component={AdminControlScreen}/>
        </ControlStack.Navigator>
    );
}

const MonitorStack = createNativeStackNavigator();

function MonitorStackScreen() {
    return (
        <MonitorStack.Navigator>
            <MonitorStack.Screen name="Monitor Menu" component={AdminMonitorScreen}/>
        </MonitorStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function NavTabAdmin() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeStackScreen}/>
            <Tab.Screen name="Control" component={ControlStackScreen}/>
            <Tab.Screen name="Monitor" component={MonitorStackScreen}/>
        </Tab.Navigator>
    );
}