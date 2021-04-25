export default {
    container:{
        flex:1,
        backgroundColor:'#F8BE85'
    },

    profileContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    title :{
        fontSize:65,
        fontWeight:'300',
        paddingBottom:30,
        color : '#ff3d00'
    },

    imageContainer : { 
        flex: 0.75, 
        width: "40%", 
        height: "20%", 
        marginLeft: 20, 
        marginTop: 30, 
        borderRadius: 40, 
    },


    formTextInput : {
        width : '80%',
        borderWidth : 2,
        borderColor : '#de1738',
        alignSelf : 'center',
        borderRadius : 30,
        padding : 20,
        margin : 2,
    },

    listTitleStyles : {
        color : 'black',
        fontWeight : 'bold',
    },

    inputBox:{
        width : '80%',
        borderWidth : 2,
        borderColor : '#de1738',
        alignSelf : 'center',
        borderRadius : 25,
        padding : 10,
        margin : 10,
        height : 75,
    },

    logOutContainer : {
        flex:0.2,
        justifyContent:'flex-end',
        paddingBottom:30
    },

    logOutButton : {
        height : 30,
        width : '100%',
        justifyContent : 'center',
        padding : 10
    },

    logOutText : {
        fontSize : 30,
        fontWeight :'bold'
    },

    drawerItemsContainer : {
        flex : 0.8,
    },

    button : {
        width : '80%',
        height : 75,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 25,
        backgroundColor : "#de1738",
        shadowColor : "#000",
        shadowOffset: {
           width: 0,
           height: 8,
       },
        shadowOpacity : 0.30,
        shadowRadius : 10.32,
        elevation: 16,
        margin : 10,
        padding : 10,
    },

    buttonText:{
        color : '#ffff',
        fontWeight : '200',
        fontSize : 20,
    },

    buttonWrapper:{
        flex:1,
        alignItems:'center'
    }
}