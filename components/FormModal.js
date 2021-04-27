import React from "react"
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Keyboard,
    TextInput,
    Animated
} from "react-native"
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import colors from "../Colors";

export default class FormModal extends React.Component {
    state = {
        newForm: ""
    };
    toggleFormCompleted = index => {
        let list = this.props.list
        list.Forms[index].completed = !list.Forms[index].completed;
        this.props.updateList(list);
    };

    addForm = () => {
        let list = this.props.list
        if (!list.Forms.some(Form => Form.title === this.state.newForm)) {
            list.Forms.push({ title: this.state.newForm, completed: false });
            this.props.updateList(list);
        }
        this.setState({ newForm: "" });
        Keyboard.dismiss();
    };
    deleteForm = index => {
        let list = this.props.list
        list.Forms.splice(index, 1)
        this.props.updateList(list)
    }

    renderForm = (Form, index) => {
        return (
            <View style={styles.FormContainer}>

                <TouchableOpacity onPress={() => this.toggleFormCompleted(index)}>
                    <Feather
                        name={Form.completed ? "check-square" : "square"}
                        size={24}
                        color={Form.completed ? colors.gray : colors.black}
                        style={{ width: 32 }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={[styles.Form, {
                        textDecorationLine: Form.completed ? 'line-through' : "none",
                        color: Form.completed ? colors.gray : colors.black
                    }]}>{Form.title}</Text>

                    <TouchableOpacity onPress={() => this.deleteForm(index)}>
                        <FontAwesome name="trash-o" size={24} color="black" />
                    </TouchableOpacity>
                </View>


            </View>
        );
    };

    render() {
        const list = this.props.list
        const taskCount = list.Forms.length;
        const completedCount = list.Forms.filter(Form => Form.completed).length;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign name="close" size={24} color={colors.black} />

                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>
                                {completedCount} / {taskCount} công việc

                       </Text>
                        </View>
                    </View>

                    <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                        <FlatList
                            data={list.Forms}
                            renderItem={({ item, index }) => this.renderForm(item, index)}
                            keyExtractor={item => item.title}
                            showsVerticalScrollIndicator={false}
                        />

                    </View>
                    <View style={[styles.section, styles.footer]} >
                        <TextInput
                            style={[styles.input, { borderColor: list.color }]}
                            onChangeText={text => this.setState({ newForm: text })}
                            value={list.newForm} />
                        <TouchableOpacity
                            style={[styles.addForm, { backgroundColor: list.color }]}
                            onPress={() => this.addForm()}
                        >
                            <AntDesign name="plus" size={16} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>

        );
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
        marginLeft: 64,
        borderBottomWidth: 3,
        paddingTop: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black
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