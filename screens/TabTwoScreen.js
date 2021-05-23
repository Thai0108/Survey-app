import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    ActivityIndicator
} from 'react-native';
import colors from '../Colors'
import { AntDesign } from '@expo/vector-icons';
import FormList from '../components/FormList'
import SendSMS from '../components/SendSMS'

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
import Fire from '../Fire'
export default class App extends React.Component {
    state = {
        addFormVisible: false,
        lists: [],
        user: {},
        loading: true
    }

    componentDidMount() {
        firebase = new Fire((error, user) => {
            if (error) {
                return alert("Something went wrong" + error)
            }

            firebase.getLists(lists => {
                this.setState({ lists, user }, () => {
                    this.setState({ loading: false })
                })
            })

            this.setState({ user });
        });
    }

    componentWillUnmount() {
        firebase.detach()
    }

    renderList = (list, index) => {
        return <FormList list={list} index={index} updateList={this.updateList} deleteForm={this.deleteForm} />
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={color.blue} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    visible={this.state.addFormVisible}
                    onRequestClose={() => this.toggleAddFormModal()}
                >
                    {/* <AddListModal closeModal={() => this.toggleAddFormModal()} addList={this.addList} /> */}
                    <SendSMS closeModal={() => this.toggleAddFormModal()} />
                </Modal>
                <View>
                    {/* <Text>User: {this.state.user.uid}</Text> */}
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.divider} />
                    <Text style={styles.title}>
                        Phiếu <Text style={{ fontWeight: "300", color: colors.blue }}>khảo sát</Text>
                    </Text>
                    <View style={styles.divider} />
                </View>

                <View style={{ height: 275, paddingLeft: 32 }}>
                    <FlatList
                        data={this.state.lists}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => this.renderList(item, index)}
                        keyboardShouldPersistTaps="always"
                    />
                </View>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: 'center'
    },
    add: {
        color: colors.blue,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8,
        textAlign: "center"
    }
});
