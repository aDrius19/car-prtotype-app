import {BarCodeScanner} from 'expo-barcode-scanner';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {getDatabase, ref, onValue} from "firebase/database";
import {StackScreenProps} from "@react-navigation/stack";

const UserSpace: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [dbData, setDbData] = useState(null);

    const db = getDatabase();
    const qrCodeRef = ref(db, 'Prototype/qr_code_value');

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            // @ts-ignore
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        onValue(qrCodeRef, (snapshot) => {
            const qrData = snapshot.val();
            setDbData(qrData);
        });
    }, [qrCodeRef])

    // @ts-ignore
    const handleBarCodeScanned = ({data}) => {
        if (data === dbData) {
            setScanned(true);
            alert("Car prototype available!");
            navigation.navigate("Test User Panel Space");
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission!</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera!</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export default UserSpace;