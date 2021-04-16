import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import colors from '../Colors';
import TodoModal from './FormModal'
import SendSMS from './SendSMS'

import { AntDesign } from '@expo/vector-icons';
export default class TodoList extends React.Component {
    state = {
        showListVisible: false,
    }

    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible })
    }

    read(index) {
        this.props.deleteTodo(index);
    }
    render() {
        const list = this.props.list
        const index = this.props.index
        // const completedCount = list.todos.filter(todo => todo.completed).length;
        // const remainingCount = list.todos.length - completedCount;


        return (
            <View>
                <Modal animationType="slide"
                    visible={this.state.showListVisible}
                    onRequestClose={() => this.toggleListModal()}
                >
                    {/* <TodoModal
                        list={list}
                        closeModal={() => this.toggleListModal()}
                        updateList={this.props.updateList}
                    /> */}
                    <SendSMS
                        list={list}
                        closeModal={() => this.toggleListModal()}
                    />

                </Modal>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", paddingLeft: 10 }}>
                    {/* <TouchableOpacity onPress={() => this.read(index)}>
                        <AntDesign
                            name="close"
                            size={24}
                            color={colors.black}
                            style={{ width: 32 }}
                        />
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity
                    // style={[styles.listContainer, { backgroundColor: list.color }]}
                    style={[styles.listContainer, { backgroundColor: "#92DFF3" }]}
                    onPress={() => this.toggleListModal()}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.title}
                    </Text>

                    <View>
                        <View style={{ alignItems: "center" }}>
                            {/* <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subtile}>Còn lại</Text> */}
                        </View>
                        <View style={{ alignItems: "center" }}>
                            {/* <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtile}>Hoàn thành</Text> */}
                        </View>
                    </View>

                </TouchableOpacity>


            </View>

        );

    }


};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,
        height: 250
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white
    },
    subtile: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white
    }

});