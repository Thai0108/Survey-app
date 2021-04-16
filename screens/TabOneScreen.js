import * as React from 'react';
import { StyleSheet, SafeAreaView, View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
    render() {
        return (

            // <WebView source={{ uri: 'https://khaosat.netlify.app' }} style={{ marginTop: 30, backgroundColor: "#fff" }} />
            <SafeAreaView style={styles.container}>
                {/* <Text>{this.state.url}</Text> */}
                {/* <View style={{ }}> */}
                    <WebView
                        style={{ flex: 1}}
                        source={{ uri: 'https://khaosat.netlify.app'}}
                    />
                {/* </View> */}
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
