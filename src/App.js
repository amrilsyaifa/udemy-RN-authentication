import React, {Component} from 'react'
import { View } from 'react-native'
import firebase from 'firebase'
import { Header, Button, CardSection, Spinner } from './components/common'
import LoginForm from './components/LoginForm'
 
class App extends Component{
    state = { loggedIn: null }


    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBAtss2o5_z2FBD07LGpWdbnefD6wAI0cc',
            authDomain: 'auth-42c10.firebaseapp.com',
            databaseURL: 'https://auth-42c10.firebaseio.com',
            projectId: 'auth-42c10',
            storageBucket: '',
            messagingSenderId: '708475133088'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) { 
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }
        })
    }

    renderContent(){
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
                    </CardSection>
                ) 
            case false:
                return <LoginForm />
            default:
                return  <CardSection>
                            <Spinner size="large" />
                        </CardSection>
        }
    }

    render() {
        return(
            <View>
                <Header />
                {this.renderContent()}
            </View>
        )
    }
}

export default App