import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errrorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton'

const setContent = (process, Component, data)   =>{
        
    switch (process){
        case 'waiting': 
            return  <Skeleton/>;                
        case 'loading': 
            return <Spinner/>;                
        case 'confirmed':
            return <Component char={data}/>     
                         
        case 'error':
            return <ErrorMessage/>;
        default: 
            throw new Error ('Unexpected process state')
    }
}

export default setContent;