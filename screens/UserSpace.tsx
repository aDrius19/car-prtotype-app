import {BarCodeScanner} from 'expo-barcode-scanner';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
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
        } else {
            alert("This QR Code is invalid!");
            setScanned(true);
        }
    };

    useEffect(() => {
        if (hasPermission === null) {
            alert("Requesting camera permission!");
        }

        if (hasPermission === false) {
            alert("No access to camera!");
        }
    }, [])

    return (
        <><View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>
        </View>
            <View style={styles.button}></View>{scanned &&
                <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}</>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    button: {
        right: 10,
        left: 10,
        position: "absolute",
        bottom: 10,
    }
});

export default UserSpace;