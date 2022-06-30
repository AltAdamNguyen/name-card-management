import { SafeAreaView, Image, StyleSheet, View, Text } from "react-native"

const Splash = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={require("../../asset/image/splash.png")} />
                <Image source={require("../../asset/image/splash1.png")} />
            </View>
            <View style={styles.title}>
                <Text>@2022 Phát triển bởi NCM Team</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        position: "absolute",
        bottom: "2%",
    }
})

export default Splash;