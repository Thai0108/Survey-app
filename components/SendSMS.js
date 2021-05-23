import * as React from 'react';
import {
    StyleSheet,
    Button,
    View,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Platform

} from 'react-native';
import * as SMS from 'expo-sms';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors'
export default class App extends React.Component {
    state = {
        phone: '',
        body: 'Cảm ơn quý khách đã sử dụng dịch vụ của khách sạn! Quý khách vui lòng gửi đánh giá chất lượng dịch vụ để khách sạn ngày một tốt hơn.',
        link: '',
    }
    sendSMS = async (link) => {
        const status = await SMS.sendSMSAsync(
            this.state.phone,
            this.state.body + "\n" + "\n" + link
        );
        console.log(status);
    }
    render() {
        const list = this.props.list
        const link = list.link
        return (
            // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.container}>
                        {/* Nút trở lại */}
                        <TouchableOpacity style={{ position: 'absolute', top: 30, right: 32, zIndex: 10 }}
                            onPress={this.props.closeModal}
                        >
                            <AntDesign name="close" size={24} color={colors.blue} />
                        </TouchableOpacity>

                        {/* Tiêu đề */}
                        {/* <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}> */}
                        <View style={[styles.section, styles.header, { borderBottomColor: colors.blue }]}>
                            <View>
                                <Text style={styles.title} numberOfLines={3}>{list.title}</Text>
                            </View>
                        </View>
                        {/* Thân */}
                        <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                            <Text style={{ marginBottom: 10, marginTop: 30, marginLeft:10 }}>Số điện thoại</Text>
                            <TextInput
                                style={[styles.input, { borderColor: colors.blue, flex: 0.5, }]}
                                onChangeText={text => this.setState({ phone: text })}
                                value={this.state.phone} />
                            <Text style={{ marginBottom: 10, marginTop: 30, marginLeft:10 }}>Nội dung</Text>
                            <TextInput
                                multiline
                                style={[styles.input, { borderColor: colors.blue }]}
                                onChangeText={text => this.setState({ body: text })}
                                value={this.state.body} />
                        </View>
                        {/* Đuôi */}
                        <View style={[styles.section, styles.footer]} >
                            <Button
                                onPress={() => this.sendSMS(link)}
                                title="Gửi phiếu"
                            />
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            // </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: 'flex-end',
        marginRight: 54,
        borderBottomWidth: 3,
        paddingTop: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black,
        paddingLeft: 10,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8

    },
    addForm: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    FormContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 32
    },
    Form: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16
    },
});
