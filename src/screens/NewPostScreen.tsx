import {View, Text, SafeAreaView} from 'react-native'
import AddNewPost from '../components/newpost/AddNewPost'

const NewPostScreen:React.FC = () => (
<SafeAreaView style={{backgroundColor:'black', flex:1}}>
    <AddNewPost />
  </SafeAreaView>
)

export default NewPostScreen
