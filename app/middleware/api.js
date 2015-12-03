export default function callAPIMiddleware (){
    return next=> action =>{
        console.trace();
        return next(action);
    };
}
