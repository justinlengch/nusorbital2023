import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../config/firebase";
import {LinearGradient} from 'expo-linear-gradient';

const backImage = require("../assets/backImageFinal.png")

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Login Successful!"))
                .catch((err) => Alert.alert("Login error", err.message));
        }
    };

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style = {styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={styles.buttonText}> Log In</Text>
                </TouchableOpacity>
                <View style={styles.signupTextContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.signupLink}>Sign Up!</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFDD0",
        opacity: 0.95,
    },
    title: {
       fontSize: 36,
       fontWeight: 'bold',
       color: "#FFFDD0",
       alignSelf: "center",
       paddingBottom: 24, 
    },
    input: {
       backgroundColor: "#CED9C3",
       height: 58,
       marginBottom: 20,
       fontSize: 16,
       borderRadius: 10,
       padding: 12,
    },
    backImage: {
       width: "100%",
       height: 340,
       position: "absolute",
       top: 0,
       resizeMode: 'cover',
    },
    whiteSheet: {
       width: '100%',
       height: '75%',
       position: "absolute",
       bottom: 0,
       backgroundColor: '#3B719F',
       borderTopLeftRadius: 60,
       borderTopRightRadius: 60,
       opacity:0.9
    },
    form: {
       flex: 1,
       justifyContent: 'center',
       marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#FFFDD0',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#3B719F',
        fontSize: 18,
    },
    signupTextContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    signupText: {
        color: '#FFFDD0',
        fontWeight: '600',
        fontSize: 14,
    },
    signupLink: {
        color: 'black',
        fontWeight: '800',
        fontSize: 14,
    },
})