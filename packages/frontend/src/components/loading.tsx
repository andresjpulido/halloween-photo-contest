export default function loading (props:{isloading:boolean}){

    if(props.isloading)
        return <div className="text-blue-500">loading ...</div>

}